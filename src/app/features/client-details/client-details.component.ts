import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin } from 'rxjs';
import { ClientService } from "../../core/client.service";
import { Client } from "../../core/client.model";
import { Note } from "../../core/note.model";
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { AddNoteDialogComponent } from "../add-note-dialog/add-note-dialog.component";

@Component({
      selector: 'app-client-details',
      standalone: true,
      imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule],
      templateUrl: './client-details.component.html',
      styleUrl: './client-details.component.scss'
})

export class ClientDetailsComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private clientService = inject(ClientService);

    client: Client | null = null;
    notes: Note[] = [];

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
    
        forkJoin({
          client: this.clientService.getClientById(id),
          notes: this.clientService.getNotesByClient(id)
        }).subscribe(({ client, notes }) => {
          this.client = client;
          this.notes = notes;
        });
    }

    goBack() {
        this.router.navigate(['/clients']);
    }
  
    deleteNote(noteId: number) {
        this.clientService.deleteNote(noteId).subscribe(() => {
            this.clientService.deleteNoteCache(noteId, this.client!.id);
            this.notes = this.notes.filter(note => note.id !== noteId);
        });
    }

    private dialog = inject(MatDialog);
    confirmDelete(noteId: number) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteNote(noteId);
            }
        });
    }

    openAddNote(){
        const dialogRef = this.dialog.open(AddNoteDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const newNote = {
                    id: Math.max(...this.notes.map(n => n.id)) + 1,
                    userId: this.client!.id,
                    title: result.title,
                    body: result.body
                };
                this.clientService.addNoteCache(newNote);
                this.notes = [...this.notes, newNote];
            }
        });
    }
}