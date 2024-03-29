// 权重：系统 + 系统版本 > 平台 > 内核 + 载体 + 内核版本 + 载体版本 > 外壳 + 外壳版本
const ua = window.navigator.userAgent.toLowerCase();
const testUa = (regexp: RegExp) => regexp.test(ua);
const testVs = (regexp: RegExp) => {
  const matchs = ua.match(regexp);
  if (matchs) {
    return matchs
      .toString()
      .replace(/[^0-9|_.]/g, "")
      .replace(/_/g, ".");
  } else {
    return "";
  }
};

export const env = {
  // 系统
  getSystem() {
    let system = "unknow";
    if (testUa(/windows|win32|win64|wow32|wow64/g)) {
      system = "windows"; // windows系统
    } else if (testUa(/macintosh|macintel/g)) {
      system = "macos"; // macos系统
    } else if (testUa(/x11/g)) {
      system = "linux"; // linux系统
    } else if (testUa(/android|adr/g)) {
      system = "android"; // android系统
    } else if (testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
      system = "ios"; // ios系统
    }
    return system;
  },
  // 系统版本
  getSystemVersion() {
    let systemVs = "unknow";
    const system = this.getSystem();
    if (system === "windows") {
      if (testUa(/windows nt 5.0|windows 2000/g)) {
        systemVs = "2000";
      } else if (testUa(/windows nt 5.1|windows xp/g)) {
        systemVs = "xp";
      } else if (testUa(/windows nt 5.2|windows 2003/g)) {
        systemVs = "2003";
      } else if (testUa(/windows nt 6.0|windows vista/g)) {
        systemVs = "vista";
      } else if (testUa(/windows nt 6.1|windows 7/g)) {
        systemVs = "7";
      } else if (testUa(/windows nt 6.2|windows 8/g)) {
        systemVs = "8";
      } else if (testUa(/windows nt 6.3|windows 8.1/g)) {
        systemVs = "8.1";
      } else if (testUa(/windows nt 10.0|windows 10/g)) {
        systemVs = "10";
      }
    } else if (system === "macos") {
      systemVs = testVs(/os x [\d._]+/g);
    } else if (system === "android") {
      systemVs = testVs(/android [\d._]+/g);
    } else if (system === "ios") {
      systemVs = testVs(/os [\d._]+/g);
    }
    return systemVs;
  },
  // 内核
  getEngine() {
    let engine = "unknow";
    if (testUa(/applewebkit/g)) {
      engine = "webkit"; // webkit内核
    } else if (testUa(/gecko/g) && testUa(/firefox/g)) {
      engine = "gecko"; // gecko内核
    } else if (testUa(/presto/g)) {
      engine = "presto"; // presto内核
    } else if (testUa(/trident|compatible|msie/g)) {
      engine = "trident"; // trident内核
    }
    return engine;
  },
  // 内核版本
  getEngineVersion() {
    let engineVs = "unknow";
    const engine = this.getEngine();
    if (engine === "webkit") {
      engineVs = testVs(/applewebkit\/[\d._]+/g);
    } else if (engine === "gecko") {
      engineVs = testVs(/gecko\/[\d._]+/g);
    } else if (engine === "presto") {
      engineVs = testVs(/presto\/[\d._]+/g);
    } else if (engine === "trident") {
      engineVs = testVs(/trident\/[\d._]+/g);
    }
    return engineVs;
  },
  // 载体
  getSupporter() {
    const engine = this.getEngine();
    let supporter = "unknow";
    switch (engine) {
      case "webkit":
        if (testUa(/edge/g)) {
          supporter = "edge"; // edge浏览器
        } else if (testUa(/opr/g)) {
          supporter = "opera"; // opera浏览器
        } else if (testUa(/chrome/g)) {
          supporter = "chrome"; // chrome浏览器
        } else if (testUa(/safari/g)) {
          supporter = "safari"; // safari浏览器
        }
        break;
      case "gecko":
        supporter = "firefox"; // firefox浏览器
        break;
      case "presto":
        supporter = "opera"; // opera浏览器
        break;
      case "trident":
        supporter = "iexplore"; // iexplore浏览器
        break;
    }
    return supporter;
  },
  // 载体版本
  getSupporterVersion() {
    const supporter = this.getSupporter();
    let supporterVs = "unknow";
    if (supporter === "chrome") {
      supporterVs = testVs(/chrome\/[\d._]+/g);
    } else if (supporter === "safari") {
      supporterVs = testVs(/version\/[\d._]+/g);
    } else if (supporter === "firefox") {
      supporterVs = testVs(/firefox\/[\d._]+/g);
    } else if (supporter === "opera") {
      supporterVs = testVs(/opr\/[\d._]+/g);
    } else if (supporter === "iexplore") {
      supporterVs = testVs(/(msie [\d._]+)|(rv:[\d._]+)/g);
    } else if (supporter === "edge") {
      supporterVs = testVs(/edge\/[\d._]+/g);
    }
    return supporterVs;
  },
  // 外壳
  getShell() {
    // 外壳和外壳版本
    let shell = "none";
    if (testUa(/micromessenger/g)) {
      shell = "wechat"; // 微信浏览器
    } else if (testUa(/qqbrowser/g)) {
      shell = "qq"; // QQ浏览器
    } else if (testUa(/ucbrowser/g)) {
      shell = "uc"; // UC浏览器
    } else if (testUa(/qihu 360se/g)) {
      shell = "360"; // 360浏览器(无版本)
    } else if (testUa(/2345explorer/g)) {
      shell = "2345"; // 2345浏览器
    } else if (testUa(/metasr/g)) {
      shell = "sougou"; // 搜狗浏览器(无版本)
    } else if (testUa(/lbbrowser/g)) {
      shell = "liebao"; // 猎豹浏览器(无版本)
    } else if (testUa(/maxthon/g)) {
      shell = "maxthon"; // 遨游浏览器
    }
    return shell;
  },
  // 外壳版本
  getShellVersion() {
    // 外壳和外壳版本
    let shellVs = "unknow";
    if (testUa(/micromessenger/g)) {
      shellVs = testVs(/micromessenger\/[\d._]+/g);
    } else if (testUa(/qqbrowser/g)) {
      shellVs = testVs(/qqbrowser\/[\d._]+/g);
    } else if (testUa(/ucbrowser/g)) {
      shellVs = testVs(/ucbrowser\/[\d._]+/g);
    } else if (testUa(/qihu 360se/g)) {
    } else if (testUa(/2345explorer/g)) {
      shellVs = testVs(/2345explorer\/[\d._]+/g);
    } else if (testUa(/maxthon/g)) {
      shellVs = testVs(/maxthon\/[\d._]+/g);
    }
    return shellVs;
  },
  // 平台
  getPlatform() {
    return this.getSystem();
  },
  getEnvs() {
    return {
      system: this.getSystem(),
      systemVersion: this.getSystemVersion(),
      engine: this.getEngine(),
      engineVersion: this.getEngineVersion(),
      supporter: this.getSupporter(),
      supporterVersion: this.getSupporterVersion(),
      platform: this.getPlatform(),
      shell: this.getShell(),
      shellVersion: this.getShellVersion(),
    };
  },
};
