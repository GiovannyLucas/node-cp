import { Router } from 'express';

import { CreateClientController } from '../../../../modules/clients/useCases/createClient/CreateClient.controller';
import { FindClientsController } from '../../../../modules/clients/useCases/findClients/FindClients.controller';
import { RemoveClientController } from '../../../../modules/clients/useCases/removeClient/RemoveClient.controller';
import { ShowClientByIdController } from '../../../../modules/clients/useCases/showClientById/ShowClientById.controller';

const clientsRouter = Router();

clientsRouter.post('/', CreateClientController.handle);
clientsRouter.get('/', FindClientsController.handle);
clientsRouter.get('/:id', ShowClientByIdController.handle);
clientsRouter.delete('/:id', RemoveClientController.handle);

export { clientsRouter };
