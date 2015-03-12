var inSpeech = new webkitSpeechRecognition() || new SpeechRecognition();
inSpeech.continuous = true;
//inSpeech.interimResults = true;

var eliza = new ElizaBot();
eliza.memSize = 200;

document.body.innerHTML += "This uses Google's Speech to Text API and the Eliza chatbot <br><br>"
document.body.innerHTML += "Press Space and begin speaking <br><br>";


inSpeech.onresult = function(inSentence)
{
	for(var i = inSentence.resultIndex; i < inSentence.results.length; i++)
	{
		if(inSentence.results[i].isFinal)
		{
			console.log("I said: "+inSentence.results[i][0].transcript);
			document.body.innerHTML += "I said: "+inSentence.results[i][0].transcript+"<br><br>";
			var reply = eliza.transform(inSentence.results[i][0].transcript);
			var audioReply = new SpeechSynthesisUtterance(reply);
			window.speechSynthesis.speak(audioReply);
			console.log("She said: "+reply);
			document.body.innerHTML += "She said: "+reply+"<br><br>";
		}
	}
}

inSpeech.onerror = function(e)
{
	console.log(e);
}

window.addEventListener("keydown", function(e)
{
	if(e.keyCode == 32)
	{
		var initial = eliza.getInitial();
		var audioReply = new SpeechSynthesisUtterance(initial);
		window.speechSynthesis.speak(audioReply);
		console.log("She said: "+initial);
		document.body.innerHTML += "She said: "+initial+"<br><br>";

		inSpeech.lang = "en-US"
		inSpeech.start();
	}
});