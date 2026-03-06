import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { Client } from "./client.model";

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
}