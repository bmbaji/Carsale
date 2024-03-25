import chatBotService from "../carsales/chatbotservice.js"
let menubar = document.querySelector("#menubar")
let navbar = document.querySelector(".navbar")

menubar.onclick = () =>{
    menubar.classList.toggle("fa-xmark")
    navbar.classList.toggle("active")
}

window.onscroll = () => {
    if(window.scrollY > 0){
        document.querySelector(".header").classList.add("active")

    }else{
        document.querySelector(".header").classList.remove("active")
    }


    menubar.classList.remove("fa-xmark")
    navbar.classList.remove("active")
}

window.onload = () => {
    if(window.scrollY > 0){
        document.querySelector(".header").classList.add("active")

    }else{
        document.querySelector(".header").classList.remove("active")
    }
}


document.querySelector("#login-btn").onclick = () =>{
    document.querySelector(".login-form-container").classList.toggle("active");
}

document.querySelector("#close-login-btn").onclick = () => {
    document.querySelector(".login-form-container").classList.remove("active");
}







/* chatbot */
const chatBtn = document.querySelector(".chat-btn")
const chatBody = document.querySelector(".chat-body")
const textInput = document.querySelector("#textInput")
const send = document.querySelector(".send")
const loadingElement = document.querySelector(".loading")
const chatRemove = document.querySelector(".chat-remove")

// let chatClosed = true
chatBtn.addEventListener("click", () => {
    const chatContainer = document.querySelector(".chat-container")
    return chatContainer.classList.remove("collapse")
    // chatClosed = true
    // return chatContainer.classList.add("collapse")
})

chatRemove.addEventListener("click", ()=> {
    const chatContainer = document.querySelector(".chat-container")
    return chatContainer.classList.add("collapse")
})




send.addEventListener("click", () => renderUserMessage())
textInput.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        e.preventDefault()
        renderUserMessage();
    }
})

const renderUserMessage = () => {
    const userInput = textInput.value
    renderMessageElement(userInput, "user")
    textInput.value = ""
    toggleLoading(false)
    renderChatBotResponse(userInput)
   
    
}
const renderChatBotResponse = (userInput) => {
    const res = getChatBotResponse(userInput)
    
}
const renderMessageElement = (txt, type) => {
    let className = "user-message"
   
    const messageElement = document.createElement("div")
    const txtNode = document.createTextNode(txt)
    messageElement.append(txtNode)
    if (type !== "user") {
        className = "chatbot-message"
        messageElement.classList.add(className)
        const botResponseContainer = document.createElement("div")
        botResponseContainer.classList.add("bot-response-container")
        const botImg = document.createElement("img")
        botImg.classList.add("chatBotImg")
        botImg.setAttribute("src", "./botImg.png")
        botResponseContainer.append(botImg)
        botResponseContainer.append(messageElement)
        chatBody.append(botResponseContainer)

    } else{
        messageElement.classList.add(className)
        chatBody.append(messageElement)
    }
}

// const throwAnError = ()=> {
//     throw new Error("I cannot reply to that. Ask something else")
// }
const getChatBotResponse = (userInput) => {
    chatBotService.getChatBotResponse(userInput)
    .then((response) => {
        renderMessageElement(response)
        setScrollPosition()
        toggleLoading(true)
        

    })
    
    .catch(error => {
        
        toggleLoading(true)
        setScrollPosition()
        
        
    })
}

const setScrollPosition = () => {
    if (chatBody.scrollHeight > 0) {
        chatBody.scrollTop = chatBody.scrollHeight
    }
}

const toggleLoading = (show) => loadingElement.classList.toggle("hide", show)


