const DB_NAME = 'TaliKhataDB';
const DB_VERSION = 1;
const STORE_NAME = 'userImages';

class ImageStorageService {
    constructor() {
        this.db = null;
        this.initDB();
    }

    initDB() {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error('IndexedDB error:', event.target.error);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            this.db = event.target.result;
        };
    }

    async storeImage(userId, imageBlob) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            const imageData = {
                id: userId,
                blob: imageBlob,
                timestamp: new Date().getTime()
            };

            const request = store.put(imageData);

            request.onsuccess = () => resolve(userId);
            request.onerror = () => reject(request.error);
        });
    }

    async getImage(userId) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(userId);

            request.onsuccess = () => {
                const imageData = request.result;
                resolve(imageData ? imageData.blob : null);
            };
            request.onerror = () => reject(request.error);
        });
    }
}

const imageStorageService = new ImageStorageService();
export default imageStorageService;