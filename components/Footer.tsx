import { ModeToggle } from "./ModeToggle"

export default function Footer() {
    const currentYear = new Date().getFullYear()
    return (
        <footer className='text-muted-foreground flex items-center justify-between p-2'>
            <p className="line-clamp-1">Copyright © {currentYear} Amardeep Lakshkar</p>
            <ModeToggle/>
        </footer>
    )
}