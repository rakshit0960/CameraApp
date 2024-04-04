import { ModeToggle } from "./mode-toggle";

export function Nav() {
    return (
        <nav className="flex justify-center w-full px-4 py-4 border-b-2">
            <ModeToggle />
        </nav>
    )
}