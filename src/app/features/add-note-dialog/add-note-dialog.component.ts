import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-add-note-dialog',
    standalone: true,
    imports: [ MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatIconModule ],
    templateUrl: './add-note-dialog.component.html',
    styleUrl: './add-note-dialog.component.scss'
})

export class AddNoteDialogComponent {
    dialogRef = inject(MatDialogRef<AddNoteDialogComponent>);
    private fb = inject(FormBuilder);

    noteForm = this.fb.group({
        title: ['', Validators.required],
        body: ['', Validators.required]
    });

    save() {
        if (this.noteForm.valid) {
            this.dialogRef.close(this.noteForm.value);
        }
    }

    cancel() {
        this.dialogRef.close();
    }

}