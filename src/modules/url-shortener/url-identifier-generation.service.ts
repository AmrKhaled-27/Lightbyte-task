import { Injectable } from '@nestjs/common';
import ShortUniqueId from 'short-unique-id';

@Injectable()
export class UrlIdentifierService {
    private readonly uid: ShortUniqueId;

    constructor() {
        this.uid = new ShortUniqueId({
            length: 7,
            dictionary: 'alphanum', // Ensures only a-z, A-Z, 0-9
        });
    }

    generateIdentifier(): string {
        return this.uid.rnd();
    }
}
