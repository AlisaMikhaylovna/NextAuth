import { signOut } from "@/auth";

const SettingsPage = async () => {
    return (
        <div>
            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
                className="flex justify-end p-4"
            >
                <button
                    type="submit"
                    className="bg-sky-200 text-white text-sm px-2 py-1 rounded hover:bg-sky-600"
                >
                    Sign out
                </button>
            </form>
            <div className="flex justify-center items-center">
                <img src="89f9e11aca7a61f5db2ac315bb0aa3bb1942011.gif@!web-article-pic.webp" />
            </div>
        </div>
    );
}

export default SettingsPage;