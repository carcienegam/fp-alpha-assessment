import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from "../../core/client.service";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-client-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatLabel, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './client-dialog.component.html',
  styleUrl: './client-dialog.component.scss'
})

export class ClientDialogComponent {
    private fb = inject(FormBuilder);
    
    clientForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.pattern(/^\d{10}$/)]
    })

    private dialogRef = inject(MatDialogRef<ClientDialogComponent>);
    private clientService = inject(ClientService);
    
    onSubmit() {
        if (this.clientForm.valid) {
            this.clientService.addClient(this.clientForm.value as any).subscribe(() => {
                this.dialogRef.close();
            });
        }
    }
}

