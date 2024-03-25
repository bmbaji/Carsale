const responseObj = {
    hello: "Hey! How are you doing?",
    hey: "Hey! What's up",
    hi: "How are you doing",

    today: new Date().toDateString(),
    time: new Date().toLocaleTimeString(),
}
const fetchResponse = (userInput) =>{
    let err = new Error("I cant of thta")
    return new Promise((res) => {
        try {
            setTimeout(() => {
                res(responseObj[userInput])
                renderChatBotResponse(userInput)
                setScrollPosition()
                toggleLoading(true)
                
            }, 1200)
        } catch (error) {
            reject(error)
            
        }
    })
    
}
const chatBotService = {
    getChatBotResponse(userInput){
        return fetchResponse(userInput)
    }
}

export default chatBotService