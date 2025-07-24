"use client"

import { useState, FormEvent, KeyboardEvent } from "react"
import { Send, Bot, Paperclip, Mic, CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
    ExpandableChat,
    ExpandableChatHeader,
    ExpandableChatBody,
    ExpandableChatFooter,
} from "@/components/ui/expandable-chat"
import { ChatMessageList } from "./ui/chat-message-list"
import { useChat } from "@ai-sdk/react"
import ReactMarkdown from "react-markdown"

export function ExpandableChatDemo() {
    const { messages, isLoading, input, setInput, handleSubmit, handleInputChange, } = useChat()

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); 
            handleSubmit(e as any); 
        }
    }

    return (
        <div className="relative">
            <ExpandableChat
                size="md"
                position="bottom-right"
                icon={<ChatBubbleAvatar
                    className="h-10 w-10 shrink-0"
                    src={
                        "/media/amardeep lakshkar.png"
                    }
                />}
            >
                <ExpandableChatHeader className="flex-col text-center justify-center">
                    <h1 className="text-xl font-semibold">Amardeep Lakshkar</h1>
                    <p className="text-sm text-muted-foreground">
                        Ask about my projects, skills, or discuss potential collaborations
                    </p>
                </ExpandableChatHeader>

                <ExpandableChatBody>
                    <ChatMessageList>
                        {messages.map((message) => (
                            <ChatBubble
                                key={message.id}
                                variant={message.role === "user" ? "sent" : "received"}
                            >
                                {
                                    message.role === "assistant" && (
                                        <ChatBubbleAvatar
                                            className="h-8 w-8 shrink-0 mt-1"
                                            src={
                                                "/media/amardeep lakshkar.png"
                                            }
                                            fallback={message.role === "assistant" ? "AM" : "US"}
                                        />
                                    )}
                                <ChatBubbleMessage
                                    variant={message.role === "user" ? "sent" : "received"}
                                >
                                    <ReactMarkdown>
                                        {message.content}
                                    </ReactMarkdown>
                                </ChatBubbleMessage>
                            </ChatBubble>
                        ))}

                        {isLoading && (
                            <ChatBubble variant="received">
                                <ChatBubbleAvatar
                                    className="h-8 w-8 shrink-0"
                                    src="/media/amardeep lakshkar.png"
                                    fallback="AM"
                                />
                                <ChatBubbleMessage isLoading />
                            </ChatBubble>
                        )}
                    </ChatMessageList>
                </ExpandableChatBody>

                <ExpandableChatFooter>
                    <form
                        onSubmit={handleSubmit}
                        className="relative bg-input/30 rounded-lg border  focus-within:ring-1 focus-within:ring-ring p-1"
                    >
                        <ChatInput
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            className="min-h-18 resize-none rounded-lg border-0 p-3 shadow-none focus-visible:ring-0"
                        />
                        <div className="flex items-center p-1 pt-0 justify-between">
                            <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                Send Message
                                <CornerDownLeft className="size-3.5" />
                            </Button>
                        </div>
                    </form>
                </ExpandableChatFooter>
            </ExpandableChat>
        </div>
    )
}
