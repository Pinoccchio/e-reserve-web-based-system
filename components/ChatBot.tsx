"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, X, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  text: string
  sender: "user" | "bot"
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messagesEndRef]) // Updated dependency

  const handleSendMessage = async () => {
    if (input.trim() === "") return

    const userMessage: Message = { text: input, sender: "user" }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")

    // TODO: Replace this with actual AI-powered chat functionality
    const botResponse: Message = { text: "Thank you for your message. How can I assist you today?", sender: "bot" }
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botResponse])
    }, 1000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button className="rounded-full p-4 shadow-lg" onClick={() => setIsOpen(true)}>
          <MessageSquare />
        </Button>
      )}
      {isOpen && (
        <Card
          className={`w-80 shadow-xl transition-all duration-300 ease-in-out ${isMinimized ? "h-14" : "h-[450px]"}`}
        >
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <CardTitle>Chat with Us</CardTitle>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          {!isMinimized && (
            <>
              <CardContent>
                <div className="h-[300px] overflow-y-auto pr-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                      <span
                        className={`inline-block rounded-lg px-3 py-2 ${
                          message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {message.text}
                      </span>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </div>
  )
}

