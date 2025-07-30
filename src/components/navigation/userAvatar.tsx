'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';

export default function UserAvatar() {
    const { user } = useAuth();

    const getInitials = (name?: string | null, email?: string | null) => {
        if (name) {
            const names = name.split(' ');
            if (names.length > 1) {
                return `${names[0][0]}${names[names.length - 1][0]}`;
            }
            return name.substring(0, 2);
        }
        if (email) {
            return email.substring(0, 2).toUpperCase();
        }
        return 'U';
    };

    if (!user) {
        return null;
    }

    return (
        <>
            <Avatar className="h-8 w-8 rounded-lg"> 
                <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
                <AvatarFallback className="rounded-lg">{getInitials(user.displayName, user.email)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.displayName}</span>
                <span className="truncate text-xs">{user.email}</span>
            </div>
        </>

    );
}
