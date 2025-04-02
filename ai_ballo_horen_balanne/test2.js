const { cmd, commands } = require('../command');
const cheerio = require("cheerio");


async function xnxxs(_0x2087d9) {
  return new Promise((_0x5cad53, _0x161a92) => {
    fetch("https://www.xnxx.com/search/" + _0x2087d9 + '/' + (Math.floor(Math.random() * 3) + 1), {
      'method': "get"
    }).then(_0x16947a => _0x16947a.text()).then(_0x194235 => {
      const _0x3aaa62 = {
        xmlMode: false
      };
      const _0x309768 = cheerio.load(_0x194235, _0x3aaa62);
      const _0xdc5570 = [];
      const _0x322e33 = [];
      const _0x57cace = [];
      const _0x21559e = [];
      _0x309768("div.mozaique").each(function (_0x328c6d, _0x147ea0) {
        _0x309768(_0x147ea0).find("div.thumb").each(function (_0x9afcc, _0x549a25) {
          _0x322e33.push("https://www.xnxx.com" + _0x309768(_0x549a25).find('a').attr("href").replace("/THUMBNUM/", '/'));
        });
      });
      _0x309768("div.mozaique").each(function (_0x1f94c6, _0x352af4) {
        _0x309768(_0x352af4).find("div.thumb-under").each(function (_0x1e266d, _0x528344) {
          _0x57cace.push(_0x309768(_0x528344).find("p.metadata").text());
          _0x309768(_0x528344).find('a').each(function (_0x21da84, _0xe3ca28) {
            _0xdc5570.push(_0x309768(_0xe3ca28).attr("title"));
          });
        });
      });
      for (let _0x3bc4d4 = 0; _0x3bc4d4 < _0xdc5570.length; _0x3bc4d4++) {
        const _0x3a463c = {
          title: _0xdc5570[_0x3bc4d4],
          info: _0x57cace[_0x3bc4d4],
          link: _0x322e33[_0x3bc4d4]
        };
        _0x21559e.push(_0x3a463c);
      }
      const _0x26565c = {
        status: true,
        result: _0x21559e
      };
      _0x5cad53(_0x26565c);
    })["catch"](_0x34c7a6 => _0x161a92({
      'status': false,
      'result': _0x34c7a6
    }));
  });
}

async function xdl(_0x3b4ec2) {
  return new Promise((_0x2fd3c5, _0x4a7c34) => {
    fetch('' + _0x3b4ec2, {
      'method': "get"
    }).then(_0x2842c4 => _0x2842c4.text()).then(_0x282c21 => {
      const _0x132741 = {
        xmlMode: false
      };
      const _0x38698b = cheerio.load(_0x282c21, _0x132741);
      const _0x336fb1 = _0x38698b("meta[property=\"og:title\"]").attr("content");
      const _0x5ebebc = _0x38698b("meta[property=\"og:duration\"]").attr("content");
      const _0x496e92 = _0x38698b("meta[property=\"og:image\"]").attr("content");
      const _0xf9ce68 = _0x38698b("meta[property=\"og:video:type\"]").attr("content");
      const _0xa1dcb8 = _0x38698b("meta[property=\"og:video:width\"]").attr("content");
      const _0x3ffa71 = _0x38698b("meta[property=\"og:video:height\"]").attr("content");
      const _0x1d36f1 = _0x38698b("span.metadata").text();
      const _0x43f894 = _0x38698b("#video-player-bg > script:nth-child(6)").html();
      const _0x5acef2 = {
        'low': (_0x43f894.match("html5player.setVideoUrlLow\\('(.*?)'\\);") || [])[1],
        'high': _0x43f894.match("html5player.setVideoUrlHigh\\('(.*?)'\\);" || [])[1],
        'HLS': _0x43f894.match("html5player.setVideoHLS\\('(.*?)'\\);" || [])[1],
        'thumb': _0x43f894.match("html5player.setThumbUrl\\('(.*?)'\\);" || [])[1],
        'thumb69': _0x43f894.match("html5player.setThumbUrl169\\('(.*?)'\\);" || [])[1],
        'thumbSlide': _0x43f894.match("html5player.setThumbSlide\\('(.*?)'\\);" || [])[1],
        'thumbSlideBig': _0x43f894.match("html5player.setThumbSlideBig\\('(.*?)'\\);" || [])[1]
      };
      const _0x1e65cf = {
        title: _0x336fb1,
        URL: _0x3b4ec2,
        duration: _0x5ebebc,
        image: _0x496e92,
        videoType: _0xf9ce68,
        videoWidth: _0xa1dcb8,
        videoHeight: _0x3ffa71,
        info: _0x1d36f1,
        files: _0x5acef2
      };
      const _0x56095f = {
        status: true,
        result: _0x1e65cf
      };
      _0x2fd3c5(_0x56095f);
    })["catch"](_0x137e70 => _0x4a7c34({
      'status': false,
      'result': _0x137e70
    }));
  });
}

const xnxxCommand = {
  pattern: "xnxxdown",
  react: '🔞',
  alias: ["xnxxsearch"],
  desc: "Search and get details from xnxx.",
  category: "download",
  use: ".xnxxdown <query>",
  filename: __filename
};

cmd(xnxxCommand, async (bot, message, args, { from, q, prefix, sender, reply }) => {
  try {
    if (!q) {
      return reply("Please provide a search term!");
    }

    const searchResults = await xnxxs(q);
    const topResults = searchResults.result.slice(0, 5);

    if (!topResults.length) {
      return reply("No results found.");
    }

    let resultList = [];
    for (let i = 0; i < searchResults.result.length; i++) {
      resultList.push({
        'title': i + 1,
        'description': searchResults.result[i].title + " \n",
        'rowId': prefix + "xnxxdl " + searchResults.result[i].link
      });
    }

    const sections = [{
      //'title': "*[Result from xnxx.com]*\n",
      'rows': resultList
    }];

    const responseMessage = {
      caption: `*🔞 LAKA-MD XNXX DOWNLOADER 🔞*`,
      image: { url: 'https://i.ibb.co/Y71b1hGn/image-1741571429452.jpg' }, 
      footer: "> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴀᴋᴀ-ᴍᴅ",
      title: '',
      buttonText: "*🔢 Reply below number*\n",
      sections: sections
    };

    const options = {
      quoted: message
    };

    return await bot.replyList(from, responseMessage, options);
  } catch (error) {
    console.log(error);
    reply("*ERROR !!*");
  }
});

const xnxxdlcommand = {
  pattern: "xnxxdl",
  alias: ["dlxnxx"],
  react: '🔞',
  desc: "Download xnxx videos",
  use: ".xnxxdown <xnxx link>",
  filename: __filename
};

cmd(xnxxdlcommand, async (bot, message, args, { from, quoted, q: query, reply }) => {
  try {
    if (!query) {
      return reply("*Please give me a URL !!*");
    }

    let videoData = await xdl(query);
    let videoTitle = videoData.result.title;

    const videoUrl = { url: videoData.result.files.high };
    const messageContent = {
      video: videoUrl,
      caption: `${videoTitle}\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴀᴋᴀ-ᴍᴅ`
    };

    await bot.sendMessage(from, messageContent, { quoted: message });

  } catch (error) {
    reply("*Error..!*");
    console.log(error);
  }
});
