---
title: Building a plane origin screen
type: post
date: 2024-10-01T00:00:00Z
draft: false
---

**TL;DR** - Building a screen to show where a plane flying overhead has come from is fiddly but magical when it works. Read on for a guide to build a screen for yourself ([GitHub repo here](https://github.com/oliverrees/jetscreen)), or save some time & [buy a simpler, more accurate clock version.](https://jetclock.io)

---

I've lived in West London my whole life, mostly under the main flight path to London Heathrow. Hour after hour, day after day, planes queue up to land. Around 240,000 of them each year. 

As well as being loud and polluting, there's something undeniably inspiring about a tin can hurtling through the air with hundreds of people inside. Not to mention the fact that the aircraft has likely traveled thousands of miles to get here. Planes are a visible emblem of the awesome achievement of the human race (and of our ultimate destruction too).

<img src="/img/posts/heathrow.jpg" title="" alt="">
*Planes coming to LHR usually land in a westerly direction*

A question I've always wondered when looking up is: where in the world has that piece of metal and plastic come from? Knowing that a plane is American Airlines flight AAL134 from Los Angeles or EgyptAir MS777 from Cairo changes an anonymous tin can into countless stories of couples returning from honeymoon, businesspeople prepping for meetings or students coming to start the new academic year. 

Yes, I can open FlightRadar24 to find out where the plane above me has come from - but monitoring the origin of an arriving aircraft every 20 seconds is slightly disruptive to getting anything else in life done (trust me, I've tried).

But what if a small screen could quietly announce the origin of each flight? 

<img src="/img/posts/adsb.jpg" title="" alt="">

### Starting with the ADS-B signal

Under International Civil Aviation Organization (ICAO) regulations, all commercial aircraft must be equipped with an ADS-B (Automatic Dependent Surveillance–Broadcast) system. This broadcasts an aircraft's position (and some other data) up to several times a second. This signal is decodable by anyone with the right kind of aerial - and you can buy an aerial for next to nothing. 

Processing raw ADS-B isn't much fun (though probably more fun than [processing raw AIS data](https://globalfishingwatch.org/data/what-does-an-ais-message-look-like-anyway/)), because it looks like this:

```
MSG,1,111,11111,A12345,11111,2024/10/01,12:30:15.000,2024/10/01,12:30:14.000,DLH1234,,,,,,,,,,,
MSG,3,111,11111,A12345,11111,2024/10/01,12:30:15.000,2024/10/01,12:30:14.000,,38000,,,-33.000123,150.000456,,,,,,
MSG,4,111,11111,A12345,11111,2024/10/01,12:30:15.000,2024/10/01,12:30:14.000,,,450.0,90.0,,,-64,,,,,,
```

Luckily you can buy a USB stick that not only collects the raw ADS-B signals of planes in range, but processes them and provides a map and an easy to read JSON endpoint. There are a few USB sticks available, but the [FlightAware Pro Stick Plus](https://www.flightaware.com/adsb/prostick/) is great and only costs around £50/$40. You'll also need an antenna ([I got this one for £5](https://thepihut.com/products/3dbi-ads-b-1090mhz-sma-antenna-w-magnetic-base)).

Next, we need a device to process and store the data - I used the [Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/). Setting up the FlightAware stick with a Raspberry Pi is really easy - [instructions are here](https://uk.flightaware.com/adsb/piaware/install).

<img src="/img/posts/adsbmap.jpg" title="" alt="">

### Displaying the data

Now we've got a map of live planes in our local area. Yes, you can get this from FlightRadar24, but there is something pretty amazing about picking up real time data with no external dependencies. To display the data we need to process the latitudes and longitudes of all the aircraft, selecting just the ones that are directly overhead. FlightAware provides a local JSON endpoint at `/data/aircraft.json`  which looks much more sensible than the raw ADS-B:

```
aircraft: [
{
hex: "405a49",
flight: "BAW777C ",
alt_baro: 4600,
alt_geom: 4600,
gs: 183.7,
ias: 180,
tas: 190,
mach: 0.296,
track: 238.1,
track_rate: -0.03,
roll: -0.2,
mag_heading: 245.6,
baro_rate: -576,
geom_rate: -608,
squawk: "0730",
emergency: "none",
category: "A3",
nav_qnh: 1008,
nav_altitude_mcp: 3008,
nav_heading: 244.7,
lat: 51.475342,
lon: -0.077424,
nic: 8,
rc: 186,
seen_pos: 0.6,
version: 2,
nic_baro: 1,
nac_p: 9,
nac_v: 1,
sil: 3,
sil_type: "perhour",
gva: 2,
sda: 3,
mlat: [ ],
tisb: [ ],
messages: 894,
seen: 0,
rssi: -19.3
},
...
```

Using the [Haversine forumula](https://en.wikipedia.org/wiki/Haversine_formula) we can calculate the exact distance between our location and all the aircraft picked up by the ADS-B antenna. When a plane comes within, say 2 KM, we can display it. There are loads of screens you could use to display this data. I used the [WaveShare 7.9in HDMI LCD](https://www.waveshare.com/wiki/7.9inch_HDMI_LCD), but it would also work on a standard monitor. 

### The nightmare of call signs

ADS-B is a brilliant format for air traffic control. It provides a unique ICAO identifier, a call sign, speed, heading and location. But this isn't massively useful for our purposes. Nothing about the routing or flight number is provided as part of the ADS-B message.

The value labeled "flight" above is frustratingly deceptive. "BAW777C" looks like a flight number, but it's not. The flight number of this aircraft is "BA777". It's similar, but just different enough to mess everything up. An explanation of why this (regrettably) makes sense is detailed in this [FlightRadar24 blog](https://www.flightradar24.com/blog/clearing-up-call-sign-confusion/). Essentially: flight numbers can sound very similar to each other so the industry moved to alphanumeric call signs (adding letters on to the flight number). 

However, decoding the flight number isn't as simple as removing the last letter of a call sign. Some airlines seem to enjoy not synchronising the call sign and flight number at all.

| Call Sign | Flight Number | Airline          | Does it make sense? |
| --------- | ------------- | ---------------- | ------------------- |
| QTR003    | QR3           | Qatar Airways    | Yes                 |
| TAP52LH   | TP1352        | TAP Air Portugal | Sort of             |
| BAW900A   | BA455         | British Airways  | Sort of             |
| SHT19M    | BA1307        | British Airways  | Absolutely not*     |

\* For some deeply confusing reason BA domestic flights use SHT (from "shuttle" as the first letters of their callsign)

So, whilst we could display an aircraft's callsign, `SHT19M` doesn't really let you get all misty eyed about the stories of passengers aboard BA1307 (which is inbound from Aberdeen incidentally). 

We need help.

### Mr Jack Wills & Josh Douch

One of the beautiful things about the internet is that people you've never met can help you for reasons you'll never truly understand. Why Mr Jack Wills and Josh Douch have put together APIs that allow callsign to flight number/routing lookups I'll never understand. But thankfully they have. 

Josh's [hexdb.io](https://hexdb.io/) and Jack's [adsbdb.com](https://www.adsbdb.com/) ingest thousands of flight records from diverse sources and let us do lookups on the data. Where this data comes from is a story in itself. Most of it comes from [PlaneBase](https://planebase.biz/) - a members only database where you have to be "sponsored" by an existing user to gain access. But it's a bizarre world of data trading and enthusiast forums. 

Regardless of where it comes from, these services allow us to do a single lookup to return routing information, taking callsign like `BAW900A` and turning it into 

```
flightroute: {
callsign: "BAW900A",
callsign_icao: "BAW900A",
callsign_iata: "BA900A",
airline: {
name: "British Airways",
icao: "BAW",
iata: "BA",
country: "United Kingdom",
country_iso: "GB",
callsign: "SPEEDBIRD"
},
origin: {
country_iso_name: "ES",
country_name: "Spain",
elevation: 53,
iata_code: "AGP",
icao_code: "LEMG",
latitude: 36.6749,
longitude: -4.49911,
municipality: "Málaga",
name: "Málaga-Costa del Sol Airport"
},
destination: {
country_iso_name: "GB",
country_name: "United Kingdom",
elevation: 83,
iata_code: "LHR",
icao_code: "EGLL",
latitude: 51.4706,
longitude: -0.461941,
municipality: "London",
name: "London Heathrow Airport"
}
}
```

Finally, we have the origin and can display it on our screen. 

### Limitations

In [the FlightRadar24 blog about call signs](https://www.flightradar24.com/blog/clearing-up-call-sign-confusion/), Ian Petchenik writes 

> Alphanumeric call signs have made processing flight data slightly more difficult for us, but the safety gains are more than worth the work.

And yet I can't help but feel that in a way FlightRadar24 actually quite enjoy the fact that callsign - flight number - routing lookup is such a mess. The mess allows FlightRadar24 to "acquire flight schedules data from third-party schedule providers and then match call signs to flight numbers using proprietary databases and machine learning."

In other words - even *with* the relevant flight schedules, the callsign to route referencing is often wrong or out of date. This starts to make FlightRadar24's proprietary machine learning algorithms mighty tempting.

This is a fact not lost on BourtosBourtosJolly, who recreated my [original setup posted on Reddit](https://www.reddit.com/r/homeautomation/comments/1ewt8v4/updated_my_home_dashboard_so_i_can_plane_spot_all/) and found that

> hexdb.io is not a great source for route information. For at least half the flights the route information is not found and for many of the cases where the route information is returned, it's inaccurate. The API call to hexdb.io returns the "updatetime" of the route information and in one case I was debugging the route was last updated in 2018. ([Source](https://www.reddit.com/r/homeautomation/comments/1ewt8v4/comment/lleqgef/?utm_name=web3xcss))

Unfortunately Boutros is dead right. Both hexdb and adsbdb simply aren't accurate. Remember that ridiculous `SHT19M` callsign from earlier? A call to `https://api.adsbdb.com/v0/callsign/SHT19M` returns an "unknown callsign" response. But it is a real flight. I saw it in the sky, on its way from Aberdeen, an hour ago.

 It's not Jack or Josh's fault. I often wonder if even the airlines/airports themselves actually know the correct callsign/flight number pairings. Heathrow has an API where they publish live arrivals - but the flight with callsign `SHT19M` is nowhere to be seen there either. Instead, it's recorded as:

```
"flightService": {
            "iataFlightIdentifier": "BA1307",
            "icaoFlightIdentifier": "BAW1307",
            "flightNumber": "1307",
            "arrivalOrDeparture": "A",
    },
```

`BAW1307` is what the callsign *should* be, if for some reason BA didn't operate domestic flights under `SHT` . And to make matters worse, BA domestic flights operating out of London City us a `CFE` callsign. So, all in all, it's a full time job just to decode what any of the call signs emitted by commercial planes actually correspond to.

As Boutros puts it 

> Sooooo - I hope I am making a simple mistake here. Otherwise the Origin City being displayed may or may not be true. It's still fun and who is going to doubt the answer!

But the only thing worse than not knowing is believing a lie. This can't be the only way. 

### Reflections

Building a screen with live ADS-B data only to discover that half of the origins are wrong could have be depressing, but it turned out to be an opportunity for renewal. A screen, pi and ADS-B stick + antenna is actually pretty expensive:

| Item                       | Cost (£) |
| -------------------------- | -------- |
| FlightAware Pro Stick Plus | 48.90    |
| Raspberry Pi 5             | 46.6     |
| WaveShare 7.9" Display     | 85.3     |
| Antenna                    | 5        |
| Cables                     | 5        |
| SD Card                    | 4        |
| Screws                     | 1        |
| **Total Cost**             | 195.80   |

For ~$260 you get a setup that gives you precision ADS-B data, but inaccurate routing data. But what if you could just pay for the routing data? 

### JetClock

C LOCK IMAGE

The clock version of the JetScreen is this idea: the minimum amount of good quality hardware you need to display accurate data about planes flying overhead. It's a cloud based version of the screen. 

| Item                       | Cost (£) |
| -------------------------- | -------- |
| HyperPixel 2.1 Round*      | 54       |
| Raspberry Pi Zero 2        | 17       |
| Case                       | 12       |
| Cables                     | 5        |
| SD Card                    | 4        |
| Screws                     | 1        |
| **Total Cost**             | 93       |

\* Yes I am aware £54 for a 2.1 inch screen is expensive but it's so beautiful, well built and is made in the UK too.

You need to get the data from somewhere (and it can be expensive), but the beauty of multiple clocks is that everyone can share a single data source, vastly reducing the cost of plane lookups. And the whole device fits in a beautiful case, too. 

Yes, you can integrate an unofficial [API for FlightRadar](https://pypi.org/project/FlightRadarAPI/) to an already existing Home Assistant setup (as [robertwigley suggested](https://www.reddit.com/r/homeautomation/comments/1ewt8v4/comment/lj83xdw/)) but the simplicity and beauty of the clock format makes me smile every time I see it. Especially when I managed to integrate npeezy's [extremely brilliant](https://www.reddit.com/r/homeautomation/comments/1ewt8v4/comment/lj20349/) suggestion of having an arrow that tracks towards the aircraft location as it moves. 

So, for a total cost of ~£149, you get a super accurate JetClock that can be built and set up in minutes & at least a year of pure routing data. And if there are more of us with them, the cost to continue to pay for the data feed should be minimal when shared between everyone. 

The most beautiful thing of all? When looking up `SHT19M` against a paid for callsign to route service we get:

```
[{"flight":"BA1307","callsign":"SHT19M",orig_iata":"ABZ","orig_icao":"EGPD"
```

Finally!

*If you'd like to join the JetClock community you can get your kit at jetclock.io*

