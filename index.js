const scraper = require('./scraper');

const urls = [
    'https://www.amazon.com/dp/B079QHML21?ref=ODS_v2_FS_SMP_Stick4K2pk',
    'https://www.ebay.com/itm/M5-Wireless-WIFI-Audiocast-Airplay-DLNA-Music-Box-Streaming-Receiver-Player-N8T1/263384863504?epid=2075483707&hash=item3d52f61310:g:m4MAAOSw~HBaMDl2'
]

scraper.scrap(urls);