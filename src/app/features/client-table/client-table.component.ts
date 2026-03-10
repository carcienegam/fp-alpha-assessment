import { Component, OnInit, ViewChild, inject } from "@angular/core";
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ClientService } from "../../core/client.service";
import { Client } from "../../core/client.model";
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { DatePipe } from "@angular/common";
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ClientDialogComponent } from "../client-dialog/client-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
    selector: "app-client-table",
    templateUrl: "./client-table.component.html",
    styleUrl: "./client-table.component.scss",
    imports: [MatTableModule, MatPaginatorModule, DatePipe, MatInputModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule],
    standalone: true
})

export class ClientTableComponent implements OnInit {
    private clientService = inject(ClientService);

    dataSource = new MatTableDataSource<Client>();
    displayedCol = ['name', 'email', 'phone', 'dateCreated'];
    searchControl = new FormControl('');

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit() {
        this.clientService.loadClients().subscribe();

        this.clientService.clients$.subscribe(clients => {
            this.dataSource.data = clients;
        });

        // Search ONLY by name (filter)
        this.dataSource.filterPredicate = (data: Client, filter: string) => {
            return data.name.toLowerCase().includes(filter);
        };

        this.searchControl.valueChanges.subscribe(value => {
            this.dataSource.filter = value?.trim().toLowerCase() || '';
            this.dataSource.paginator?.firstPage();
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    private dialog = inject(MatDialog);
    openDialog() {
        this.dialog.open(ClientDialogComponent, {
            width: '350px'
        });
    }

    private router = inject(Router);
    goToDetails(client: Client) {
        this.router.navigate(['/clients', client.id]);
    }

}

