import { db } from '@/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';


export const addNewUser = async (user, uid) => {
    
    try {
        const salt = 10
        const hashedPassword = await bcrypt.hash(user.password, salt)

        await setDoc(doc(db, 'users', uid), {
            name: user.name,
            email: user.email,
            password: hashedPassword,
            id: uid,
        });

        console.log('User added with ID: ', uid);
    } catch (error) {
        console.error('Failed to add user: ', error);
    }
};

