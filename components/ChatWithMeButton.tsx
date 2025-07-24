"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function ChatWithMeButton() {
    const handleChatClick = () => {
        const chatToggle = document.querySelector('[class*="w-11 h-11 rounded-full transition-all duration-300"][class*="transition-all"]') as HTMLButtonElement
        if (chatToggle) {
            chatToggle.click()
        }
    }

    return (
        <Button
            variant={"outline"}
            onClick={handleChatClick}
        >
            <MessageCircle />
            Chat With Me
        </Button>
    )
}