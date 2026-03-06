import { Component, OnInit, ViewChild, inject } from "@angular/core";
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ClientService } from "../core/client.service";
import { Client } from "../core/client.model";
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { DatePipe } from "@angular/common";

@Component({
    selector: "app-client-table",
    templateUrl: "./client-table.component.html",
    styleUrl: "./client-table.component.css",
    imports: [MatTableModule, MatPaginatorModule, DatePipe],
    standalone: true
})

export class ClientTableComponent implements OnInit {
    private clientService = inject(ClientService);

    dataSource = new MatTableDataSource<Client>();
    displayedCol = ['name', 'email', 'phone', 'dateCreated'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit() {
        this.clientService.loadClients().subscribe(clients => {
            this.dataSource.data = clients;
            this.dataSource.paginator = this.paginator;
        });
    }
}

