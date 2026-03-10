import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { Client } from "./client.model";
import { Note } from "./note.model";
import { of } from "rxjs";
import { not } from "rxjs/internal/util/not";

@Injectable({ providedIn: "root" })

export class ClientService {
    private http =  inject(HttpClient);
    private apiURL = "https://jsonplaceholder.typicode.com";

    private clientsSubject = new BehaviorSubject<Client[]>([]);
    clients$ = this.clientsSubject.asObservable();

    loadClients(): Observable<Client[]> {
        // If we already have clients loaded, return the observable of the current clients
        if (this.clientsSubject.getValue().length > 0) {
            return this.clients$;
        }
        return this.http.get<Client[]>(`${this.apiURL}/users`).pipe(
            map(clients => clients.map(client => ({
                ...client,
                dateCreated: new Date().toISOString()
            }))),

            tap(clients => this.clientsSubject.next(clients))
        );
    }

    addClient(client: Omit<Client, 'id' | 'dateCreated'>): Observable<Client> {
        return this.http.post<Client>(`${this.apiURL}/users`, client).pipe(
            tap(() => {
                const currentClients = this.clientsSubject.getValue();
                const newId = Math.max(...currentClients.map(c => c.id), 0) + 1;
                const newClient: Client = {
                    ...client,
                    id: newId,
                    dateCreated: new Date().toISOString()
                };
                this.clientsSubject.next([...currentClients, newClient]);
            })
        );
    }

    getClientById(id: number): Observable<Client> {
        // Search in the current clients first, for local caching.
        const currentClients = this.clientsSubject.getValue().find(c => c.id === id);
        if (currentClients) {
            return of(currentClients);
        }
        return this.http.get<Client>(`${this.apiURL}/users/${id}`);
    }

    private notesCache = new Map<number, Note[]>();

    getNotesByClient(id: number): Observable<Note[]> {
        // Check if we have notes for this client in the cache
        if (this.notesCache.has(id)) {
            return of(this.notesCache.get(id)!);
        }

        return this.http.get<Note[]>(`${this.apiURL}/users/${id}/posts`).pipe(
            tap(notes => this.notesCache.set(id, notes))
        )
    }

    // For cache management when adding or deleting notes
    addNoteCache(note: Note) {
        const notes = this.notesCache.get(note.userId) || [];
        this.notesCache.set(note.userId, [...notes, note]);
    }

    deleteNoteCache(noteId: number, userId: number) {
        const notes = this.notesCache.get(userId) || [];
        this.notesCache.set(userId, notes.filter(n => n.id !== noteId))
    }

    deleteNote(noteId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiURL}/posts/${noteId}`);
    }

}