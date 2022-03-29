require('dotenv').config();
const {Client,Intents, GuildMemberManager}=require('discord.js')
const {google}=require('googleapis')
//console.log(process.env.DISCORD_BOT_TOKEN)

//i had no time because of my brothers weeding and didnt know anything about discord and never used googlesheets so whatever i can make and understood and made the bot  in a day so it is liile on rough side


const app=async()=>{

    const client2=new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

     client2.login(process.env.DISCORD_BOT_TOKEN)
//loggin the bot using ready event
client2.on('ready',()=>{
    console.log('the bot has looged in')
})

//was just practicing so ignore it 
client2.on('messageCreate',(message)=>{
    if(message.content==='hello'){
        message.reply(`Hello ${message.author.tag}`)
    }
})


 
//creating a authentication file for goggle apis
const auth=new google.auth.GoogleAuth({
    keyFile:"credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",

});

const Client1=await auth.getClient();

const googlesheets=google.sheets({version:"v4",auth:Client1})

const spreadsheetid="1gabxY0RxiEeGySiS0Rv0XWHL-_8LyJ0C43ZdP-HjQsE"
//googlesheets meta data all the data is present 
const metadata=await googlesheets.spreadsheets.get({
        auth:auth,
       spreadsheetId:spreadsheetid,

    })
//reading rows from google sheet
    const getrows1=await googlesheets.spreadsheets.values.get({
        auth:auth,
        spreadsheetId:spreadsheetid,
        range:"Sheet1!A:A"
    })
//same here as above
    const getrows2=await googlesheets.spreadsheets.values.get({
        auth:auth,
        spreadsheetId:spreadsheetid,
        range:"Sheet1!A:B"
    })
// getrows2.data.values.forEach((mess)=>{
// console.log(mess[1])
// })



    const getrows3=await googlesheets.spreadsheets.values.get({
        auth:auth,
        spreadsheetId:spreadsheetid,
        range:"Sheet2!A:A"
    })
     // console.log(getrows3.data.values)

//     client2.on('messageCreate',(message)=>{
//         if(message.member.roles.cache.has('957381982604648509')){
//            return  console.log('is a member')
//         }
// console.log('is not a member')
//     })






//main bot function starts from here
    client2.on('messageCreate',async(message)=>{
       // if(message.content)



//checking for the clan 

 try{   
for(let i=0;i<4;i++){

 if(message.author.bot)return;
 let curr=getrows1.data.values[i] 
 //console.log(curr)
    if(curr?.[0]===message.content){
        message.channel.send('valid clan')
        
    let curr2=getrows2.data.values[i] 
   // console.log(curr)
        if(curr2?.[1]==='yes'){
            message.channel.send('enter the email address')   

           return func1()
        }
        
          
            return message.channel.send('this clan is not active')
          
        
        
     
        
     return message.channel.send('thankyou')
        
        
    }
   console.log(curr)
}
}catch(e){
    console.log('error in main function',e)
 message.channel.send('not a valid clan')
}
      
  })
//func1 validating the email
  const func1=()=>{
      client2.on('messageCreate',(message)=>{

        for(let i=0;i<2;i++){
        
      //   if(message.author.bot)return;
         let curr3=getrows3.data.values[i]
         console.log(curr3[0])
            if(curr3[0]===message.content){
                message.channel.send('valid email address')
                message.channel.send('enter the phone number')
              return func2(curr3[0]);
               
                
            }
        
        }
    
        return console.log('error in func1')

    })

  }
//writing on the google sheets
  const func2=async(idx)=>{
      
     client2.on('messageCreate',async(message)=>{

        await googlesheets.spreadsheets.values.append({
            auth,
            spreadsheetId:spreadsheetid,
            range: "Sheet2!C:D",
            valueInputOption: "USER_ENTERED",
            resource: {
              values: [[idx, message.content]],
            },
          });
       // message.channel.send('mention roleID')
        // client2.on('message',(message)=>{
        //   let role=message.guild.roles.cache.find(r=>r.id==='957381982604648509');
        //   let member=message.mentions.members.first()
        //   member.add(role)
        // })
        // var role= message.guild.roles.cache.find((role)=>{
        //   console.log(role.id)
        // })
     //   GuildMemberManager.add("member")
    // let target= message.mentions.members.first()
    // const role=message.mentions.roles.first()
    // await target.roles.add(role)



    //adding the role of member so it can send messages and join the clan as channels are locked and bot will assign role and then they can join and have fun
    let role = message.member.guild.roles.cache.find(role => role.name === "member");
    console.log(role.id)
    if (role) message.guild.members.cache.get(message.author.id).roles.add(role)


   

  })

  }

}
app()
