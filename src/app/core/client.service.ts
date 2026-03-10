import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { Client } from "./client.model";
import { Note } from "./note.model";

@Injectable({ providedIn: "root" })

export class ClientService {
    private http =  inject(HttpClient);
    private apiURL = "https://jsonplaceholder.typicode.com/";

    private clientsSubject = new BehaviorSubject<Client[]>([]);
    clients$ = this.clientsSubject.asObservable();

    loadClients(): Observable<Client[]> {
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
        return this.http.get<Client>(`${this.apiURL}/users/${id}`);
    }

    getNotesByClient(id: number): Observable<Note[]> {
        return this.http.get<Note[]>(`${this.apiURL}/users/${id}/posts`);
    }

    deleteNote(noteId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiURL}/posts/${noteId}`);
    }

}