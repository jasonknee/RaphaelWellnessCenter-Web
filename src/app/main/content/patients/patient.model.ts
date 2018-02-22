import { FuseUtils } from '../../../core/fuseUtils';

export class Patient
{
    id: string;
    name: string;
    address: string;
    dob: string;
    gender: string;
    phoneNumber: string;
    type: string;

    constructor(contact)
    {
        {
            this.id = contact.id || FuseUtils.generateGUID();
            this.name = contact.name || '';
            this.address = contact.lastName || '';
            this.dob = contact.avatar || 'assets/images/avatars/profile.jpg';
            this.gender = contact.nickname || '';
            this.phoneNumber = contact.company || '';
            this.type = contact.jobTitle || '';
        }
    }
}
