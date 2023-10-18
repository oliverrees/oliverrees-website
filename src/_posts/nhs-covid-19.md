---
title: The COVID-19 NHS app is disruptive for all the wrong reasons
type: post
date: 2020-05-05T00:00:00Z
draft: false
---

My first introduction to the use of technology in the NHS was from a friend who had recently qualified as a doctor. As I’d try and excite her about the benefits of “disruptive” new health-tech apps, she’d reply, wearily, that they might have limited use in the hospital she was working at which was literally collapsing at the seams. Forget apps, she told me, basic life saving equipment would be much more useful.

Yet for underfunded and underprepared health systems new “disruptive”, “consumer grade”, technologies offer the ultimate panacea: cheap, scalable solutions that can replace people and cut costs. And the best news? They can be built by a room of developers and deployed with the press of a button. It’s the COVID-19 NHS app button that was pressed today on the Isle of Wight — touted as the “South Korea solution” to get the UK out of lockdown.

With just 254 COVID deaths, South Korea’s strategy, and their use of technology, has been heralded as the UK’s path out of lockdown. But the reason that South Korea managed to save so many lives wasn’t because of any disruptive technology, or any genius app. It was simple: the government and health system was prepared with a variety of low and high tech solutions, training and equipment.

In reality the UK is launching an untested technology with the pretence that the approach has been tried and tested. The app is new, the technical approach is new and so the outcomes can’t be predicted. The intentions behind the track & trace app are undoubtably noble. But that is not an excuse to cover up significant failings in the technology’s conception, especially because so many lives are depending on it.

## A chronic lack of technological investment

As the first cases of COVID-19 hit South Korea, the government notified residents using their emergency broadcast system. It might seem trivial for a government to be able to send a simple text notification to its citizens, but the technology is relatively complicated & time intensive to set up. You have to liaise with mobile phone providers, design the systems, processes and interfaces for an event that you hope will never happen. Despite the costs involved, governments from the US to the Netherlands deemed the investment worthwhile. After all, it’s likely that at some point in the future a government will need to notify everyone about _something_.

The UK government went so far as to conduct trials for an emergency broadcast system in [2013](https://www.gov.uk/government/publications/mobile-alerting-trials-for-public-emergencies), but these trials were never taken any further. In a [Guardian report](https://www.theguardian.com/world/2020/mar/23/government-ignored-advice-set-up-uk-emergency-alert-system) Lord Harris, a Labour peer, lamented that “it’s fallen between government departments as to who is going to pick up the bill, who’s going to lead on it, and all sorts of issues.”

In what becomes a pattern in the UK government’s response to COVID, a lack of planning is combined with a knee-jerk response. Needing to send out a text message to everyone in the UK, the government leaned on mobile phone providers to send out a text to all of their customers informing them about the dangers of COVID.

This instantly created a serious security problem. Whereas the emergency system notifications cannot be spoofed by a would be attacker, anyone can send an SMS with the from name “UK Government.” Ofcom [published guidance to help consumers spot these scams](https://www.ofcom.org.uk/about-ofcom/latest/features-and-news/coronavirus-scam-calls-and-texts), but to add to the complexity the guidance states that “While keeping an eye out for scam calls and texts, remember that the Government has been sending out official alerts to mobile phones.” The instruction is to trust some texts, but not others, and to use your “judgement” as to whether the message is official or not. It can often be difficult for security experts to determine whether a text is legitimate or not, and so this guidance at a time of increased COIVD fraud isn’t particularly reassuring.

## An approach with significant flaws

Developing technology, to use the government’s preferred lexicon, “at pace,” isn’t usually advised. Mark Zuckerberg famously changed one of Facebook’s core mantras from “move fast and break things” to “move fast with stable infra[structure].” Zuckerberg realised that building tools for billions of people filled with glitches and errors often caused headaches later down the line. As seen with the emergency broadcast SMS fix, it becomes clear why. Bodging a solution during a crisis often turns out to create a whole host of other unexpected problems.
Enter the COVID-19 NHS app.

Developed “at pace,” the app **does not** utilise the APIs [created by Apple and Google](https://www.apple.com/uk/newsroom/2020/04/apple-and-google-partner-on-covid-19-contact-tracing-technology/) designed specifically to gather contact tracing data. Instead, it relies on a “workaround,” that connects to a central database, rather than storing data on the device itself.

The UK’s chosen method of data collection goes against Apple and Google’s recommendation, specifically because the method of data collection doesn’t work in the background, when the phone is on standby. According to a [report from The Register](https://www.theregister.co.uk/2020/05/05/uk_coronavirus_app/), “unless people have the NHS app running in the foreground and their phones awake most of the time, the fundamental principle underpinning the entire system — that phones detect each other — won’t work.”

The entire architecture of the COVID-19 NHS app; tens of thousands of hours of development during the greatest crisis in living memory, potentially undone with a key assumption: that people will have the phones awake & the app in the foreground at all times. Germany, Ireland, and many others are using the purpose built API to create apps that can collect data in the background, precisely to avoid this issue. After all, most people, most of the time, have their phones in sleep mode.

Why would the UK government make such an obviously counter intuitive technology decision?

One reason relates to the “at pace” development. The way the UK has chosen to develop the app doesn’t rely on new APIs and is a “workaround” utilising already existing methods. For this reason, development could start on the app before Google & Apple’s API was ready, potentially saving weeks of time in the process. So far so legitimate. But as anyone who has built a piece of technology knows, something built fast that doesn’t work most of the time usually spells trouble, so there must be another compelling reason too.

And this reason is much more sinister.

## Sensitive data harvested by private companies

The history of politics from 2015–2020 has been characterised by technology, data and disruption. The protagonists of the major political upheavals, people like Steve Bannon and Dominic Cummings, are data and AI evangelists. As the “data will save the world” rhetoric has spread around government, surprising things have started to happen. Faculty, the Vote Leave AI consultancy, has won 7 government contracts. Ben Warner, an ex-Vote Leave data scientist with no medical background, has attended SAGE meetings— a supposedly independent advisory committee.

On the 29th March the [government announced](https://healthtech.blog.gov.uk/2020/03/28/the-power-of-data-in-a-pandemic/) that Faculty and Palantir were among the organisations chosen to partner with the NHS “ because of their knowledge in data and the skills they have for working in complex environments and delivering at pace in this time of crisis”. As well as being able to work “at pace,” one other attribute that characterises both Palantir and Faculty, but is forgotten in the government announcement, is that both organisations have an insatiable lust for data.

Palantir makes a business model of digitising an organisation’s data for free and then charging a retainer for that organisation to access their own data. Under the auspices of civic responsibility, Palantir has [offered 45 engineers to the NHS data project for just £1](https://tech.newstatesman.com/coronavirus/palantir-45-engineers-to-nhs-covid-19-datastore). Faculty, proposed a “[simulation of a policy described as “targeted herd immunity” more than a week after ministers insisted the controversial policy was no longer being contemplated.](https://www.theguardian.com/world/2020/apr/12/uk-government-using-confidential-patient-data-in-coronavirus-response)”.

Initially NHSX, the digital wing of the NHS, reassured citizens that the data collection project would stop after COVID had been beaten. It’s even _bolded_ on the government announcement: “_Once the public health emergency situation has ended, data will either be destroyed or returned in line with the law._” But as the crisis developed the attitude… softened. Matthew Gould, the CEO of NHSX said in April that “Sophisticated data analysis will allow us to make changes to the NHS, ensuring that our hardworking health and care professionals and the people that depend on them are served by a much more efficient and responsive organisation.” As has happened many times in the past, as AI firms embed themselves in operations and decision making, it becomes impossible to remove them — [as the NYPD](https://www.buzzfeednews.com/article/williamalden/theres-a-fight-brewing-between-the-nypd-and-silicon-valley), and many other public US institutions have discovered.

It’s important to reiterate that I believe those at Faculty and Palantir working on this project have the best of intentions. But for a data scientist, the best of intentions usually involves collecting as much data as possible. The technical architecture for the NHS COVID-19 app was designed with this principle in mind. Rather than letting data languish on decentralised devices, why not use this opportunity to store as much data about symptoms and infections on a central system that can then be analyzed and mined for insight?

The argument makes sense, until you realise that the desire for data collection has resulted in a completely ineffective technical architecture. Listening to data savants wins elections and helps test messaging (luckily, voting is a pretty binary metric), but it offers a one dimensional perspective in other areas.

The world isn’t made up of predictable bits and bytes, it’s made up of complex systems and social interactions, where the consequences of the wrong decision is thousands of people dying.

Data is a useful way to make decisions. But it should not be the only way.

## Where next?

The UK is on track to emerge from the COVID crisis with one of the worst death rates in Europe. Technology may very well be the best way to cope with the virus until a vaccine is produced. To create the best technological solutions requires the widest engagement — consultation with experts in different fields, patients and members of the public. Importantly, decisions need to made in a balanced, transparent and scrutinised way.

The NHS COVID-19 app has been created without any of these elements. Developed as a knee-jerk reaction to a lack of preparation, under the guidance of private data analysis companies, with a lack of consensus building or transparency, the app is certainly disruptive. But in this case, that disruption isn’t a good thing.
