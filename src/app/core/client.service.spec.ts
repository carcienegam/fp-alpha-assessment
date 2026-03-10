import { TestBed } from "@angular/core/testing";
import { ClientService } from "./client.service";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { Client } from "./client.model";

describe('ClienteService', () => {
    let service: ClientService;
    let httpMock: HttpTestingController;

    const mock: Client[] = [
        { id: 1, name: 'James Smith', email: 'james.smith@example.com', phone: '8110102020'},
        { id: 2, name: 'Maria Garcia', email: 'maria.garcia@example.com', phone: '8110102021'}
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ClientService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(ClientService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should load clients', () => {
        service.loadClients().subscribe(clients =>{
            expect(clients.length).toBe(2);
            expect(clients[0].name).toBe(mock[0].name);
        });

        const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
        expect(req.request.method).toBe('GET');
        req.flush(mock);
    });

    it('should add a client', () => {
        service.loadClients().subscribe();
        const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
        req.flush(mock);

        const newClient = { name: 'Emilio Lopez', email: 'emilio.lopez@example.com', phone: '8110102022' };

        service.addClient(newClient).subscribe();
        const postReq = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
        postReq.flush({id: 3, ...newClient});

        service.clients$.subscribe(clients => {
            expect(clients.length).toBe(3);
        });
    });


});


