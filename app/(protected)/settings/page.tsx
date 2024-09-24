"use client"
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";


const SettingsPage = async () => {
    const user = useCurrentUser();

    const onClick = () => {
        logout();
    };

    return (
        <div className="bg-white p-10 rounded-xl">
            <button onClick={onClick}>Click me</button>
        </div>
    );
}

export default SettingsPage;