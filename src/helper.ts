import {User, Profile, Ranked, Casual, Warmup} from "./types";

export function formatYMDHMS(now: Date){
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}

export function handleOnlineStatus(status: "online" | "away" | "dnd" | "offline") {
  switch (status) {
    case "online": return '🟢 在线';
    case "away": return '🟡 离开';
    case "dnd": return '🔴 勿打扰';
    case "offline": return '离线';
  }
}
export async function handleServerStatus(status: any) {
  const result = ['']
  for (const server of status) {
    const name = <string>server.name
    let status
    switch (server.status) {
      case "Online": status = '🟢 在线'; break
      case "Degraded": status = '🟡 局部故障'; break
      case "Interrupted": status = '🔴 停机'; break
      case "Maintenance": status = '🔧 维护'; break
    }
    result.push(name.replace('Rainbow Six Siege - ', '') + ' - ' + status)
  }
  return result
}

export class KookCardTemp {
  static ServerStatusCard(info, s: string) {
    return {
      "type": "card",
      "theme" : "info",
      "size": "lg",
      "modules": [
        {
          "type": "header",
          "text" : {
            "type": "plain-text",
            "content": "Rainbow Six : Siege 服务器状态"
          }
        },
        {
          "type": "section",
          "text" : {
            "type": "plain-text",
            "content": `更新日期: ${s}`
          }
        },
        {
          "type": "section",
          "text" : {
            "type": "kmarkdown",
            "content": info
          },
        }
      ]
    }
  }

  static BindCard(user: User) {
    return {
        "type": "card",
        "size": "lg",
        "theme": "warning",
        "modules": [
          {
            "type": "header",
            "text": {
              "type": "plain-text",
              "content": "账号绑定确认"
            }
          },
          {
            "type": "section",
            "mode": "left",
            "accessory": {
              "type": "image",
              "src": user.avatars["146"]
            },
            "text": {
              "type": "kmarkdown",
              "content": `用户名 **${user.username}** 平台 **${user.platform}** \nID：**${user.userId}`
            }
          },
          {
            "type": "section",
            "mode": "right",
            "accessory": {
              "type": "button",
              "theme": "primary",
              "value": `confirm_${user.userId}_${user.platform}`,
              "click": "return-val",
              "text": {
                "type": "plain-text",
                "content": "绑定"
              }
            },
            "text": {
              "type": "kmarkdown",
              "content": "这是你吗？点击右侧“确认”按钮，即可完成绑定。"
            }
          }
        ]
      }
  }

  static FriendCard(user: User, kookName, kookAvast) {
    return {
      "type": "card",
      "size": "lg",
      "theme": "info",
      "modules": [
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": "好友名片信息"
          }
        },
        {
          "type": "section",
          "mode": "left",
          "accessory": {
            "type": "image",
            "src": user.avatars["146"]
          },
          "text": {
            "type": "kmarkdown",
            "content": `用户名 **${user.username}** 平台 **${user.platform}** \nID：**${user.userId}**`
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "image",
              "src": kookAvast,
              "alt": "",
              "size": "lg",
              "circle": true
            },
            {
              "type": "kmarkdown",
              "content": `绑定账户 ${kookName}`
            }
          ]
        },
      ]
    }
  }
  static RankInfoCard(user: User, profile: Profile, ranked: Ranked, s: "online" | "away" | "dnd" | "offline") {
    const status = handleOnlineStatus(s)
    let top = ""
    if (ranked.topRankPosition > 0) top = '冠军 **第' + ranked.topRankPosition + ' **名 |'

    return   {
      "type": "card",
      "size": "lg",
      "theme": "info",
      "modules": [
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": `${user.username} 排位数据 (${profile.season.shorthand})`
          }
        },
        {
          "type": "section",
          "mode": "left",
          "accessory": {
            "type": "image",
            "src": `${user.avatars["146"]}`,
          },
          "text": {
            "type": "kmarkdown",
            "content": `用户名：**${user.username}** (${user.platform})   状态：**${status}** \n 等级：**${profile.level}** 阿尔法包: **${profile.lootboxProbability.percent}**`
          }
        },
        {
          "type": "section",
          "mode": "left",
          "accessory": {
            "type": "image",
            "src": `${ranked.rank.iconOfficial}`,
            "circle": true
          },
          "text": {
            "type": "kmarkdown",
            "content": `${top} **MMR** ${ranked.rank.mmr} | **分段** ${ranked.rank.range} | **最高MMR** ${ranked.maxRank.mmr}`
          }
        },
        {
          "type": "section",
          "accessory": {},
          "text": {
            "type": "paragraph",
            "cols": 3,
            "fields": [
              {
                "type": "kmarkdown",
                "content": "**KD**"
              },
              {
                "type": "kmarkdown",
                "content": "**胜率**"
              },
              {
                "type": "kmarkdown",
                "content": "**场次**"
              },
              {
                "type": "plain-text",
                "content": `${ranked.kd}`
              },
              {
                "type": "plain-text",
                "content": `${ranked.winRate}`
              },
              {
                "type": "plain-text",
                "content": `${ranked.matches}`
              },
              {
                "type": "kmarkdown",
                "content": "**击杀/死亡**"
              },
              {
                "type": "kmarkdown",
                "content": "**胜/负**"
              },
              {
                "type": "kmarkdown",
                "content": "**弃赛数**"
              },
              {
                "type": "plain-text",
                "content": `${ranked.kills}-${ranked.deaths}`
              },
              {
                "type": "plain-text",
                "content": `${ranked.wins}-${ranked.losses}`
              },
              {
                "type": "plain-text",
                "content": `${ranked.abandons}`
              }
            ]
          }
        },
        {
          "type": "action-group",
          "elements": [
            {
              "type": "button",
              "theme": "primary",
              "value": JSON.stringify({
                type: 'r6lookup',
                action: 'casual',
                data: {
                  user: user
                }
              }),
              "click": "return-val",
              "text": {
                "type": "plain-text",
                "content": "休闲数据"
              }
            },
            {
              "type": "button",
              "theme": "primary",
              "value": JSON.stringify({
                type: 'r6lookup',
                action: 'warmup',
                data: {
                  user: user
                }
              }),
              "click": "return-val",
              "text": {
                "type": "plain-text",
                "content": "团队竞技数据"
              }
            },
            {
              "type": "button",
              "theme": "primary",
              "value": JSON.stringify({
                type: 'r6lookup',
                action: 'picture',
                data: {
                  user: user
                }
              }),
              "click": "return-val",
              "text": {
                "type": "plain-text",
                "content": "获取图片"
              }
            }
          ]
        }
      ]
    }
  }

  static CasualInfoCard(user: User, profile: Profile, casual: Casual, s: "online" | "away" | "dnd" | "offline") {
    const status = handleOnlineStatus(s)
    return   {
      "type": "card",
      "size": "lg",
      "theme": "info",
      "modules": [
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": `${user.username} 休闲数据 (${profile.season.shorthand})`
          }
        },
        {
          "type": "section",
          "mode": "left",
          "accessory": {
            "type": "image",
            "src": `${user.avatars["146"]}`,
          },
          "text": {
            "type": "kmarkdown",
            "content": `用户名：**${user.username}** (${user.platform})   状态：**${status}** \n 等级：**${profile.level}** 阿尔法包: **${profile.lootboxProbability.percent}**`
          }
        },
        {
          "type": "section",
          "accessory": {},
          "text": {
            "type": "paragraph",
            "cols": 3,
            "fields": [
              {
                "type": "kmarkdown",
                "content": "**KD**"
              },
              {
                "type": "kmarkdown",
                "content": "**胜率**"
              },
              {
                "type": "kmarkdown",
                "content": "**场次**"
              },
              {
                "type": "plain-text",
                "content": `${casual.cKD}`
              },
              {
                "type": "plain-text",
                "content": `${casual.cWinRate}`
              },
              {
                "type": "plain-text",
                "content": `${casual.cMatches}`
              },
              {
                "type": "kmarkdown",
                "content": "**击杀/死亡**"
              },
              {
                "type": "kmarkdown",
                "content": "**胜/负**"
              },
              {
                "type": "kmarkdown",
                "content": "**弃赛数**"
              },
              {
                "type": "plain-text",
                "content": `${casual.cKills}-${casual.cDeaths}`
              },
              {
                "type": "plain-text",
                "content": `${casual.cWins}-${casual.cLosses}`
              },
              {
                "type": "plain-text",
                "content": `${casual.cAbandons}`
              }
            ]
          }
        },
        {
          "type": "action-group",
          "elements": [
            {
              "type": "button",
              "theme": "primary",
              "value": JSON.stringify({
                type: 'r6lookup',
                action: 'rank',
                data: {
                  user: user
                }
              }),
              "click": "return-val",
              "text": {
                "type": "plain-text",
                "content": "排位数据"
              }
            },
            {
              "type": "button",
              "theme": "primary",
              "value": JSON.stringify({
                type: 'r6lookup',
                action: 'warmup',
                data: {
                  user: user
                }
              }),
              "click": "return-val",
              "text": {
                "type": "plain-text",
                "content": "团队竞技"
              }
            },
            {
              "type": "button",
              "theme": "primary",
              "value": JSON.stringify({
                type: 'r6lookup',
                action: 'picture',
                data: {
                  user: user
                }
              }),
              "click": "return-val",
              "text": {
                "type": "plain-text",
                "content": "获取图片"
              }
            }
          ]
        }
      ]
    }
  }

  static WarmupInfoCard(user: User, profile: Profile, warmup: Warmup, s: "online" | "away" | "dnd" | "offline") {
    const status = handleOnlineStatus(s)
    return   {
      "type": "card",
      "size": "lg",
      "theme": "info",
      "modules": [
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": `${user.username} 团队竞技数据 (${profile.season.shorthand})`
          }
        },
        {
          "type": "section",
          "mode": "left",
          "accessory": {
            "type": "image",
            "src": `${user.avatars["146"]}`,
          },
          "text": {
            "type": "kmarkdown",
            "content": `用户名：**${user.username}** (${user.platform})   状态：**${status}** \n 等级：**${profile.level}** 阿尔法包: **${profile.lootboxProbability.percent}**`
          }
        },
        {
          "type": "section",
          "accessory": {},
          "text": {
            "type": "paragraph",
            "cols": 3,
            "fields": [
              {
                "type": "kmarkdown",
                "content": "**KD**"
              },
              {
                "type": "kmarkdown",
                "content": "**胜率**"
              },
              {
                "type": "kmarkdown",
                "content": "**场次**"
              },
              {
                "type": "plain-text",
                "content": `${warmup.wKD}`
              },
              {
                "type": "plain-text",
                "content": `${warmup.wWinRate}`
              },
              {
                "type": "plain-text",
                "content": `${warmup.wMatches}`
              },
              {
                "type": "kmarkdown",
                "content": "**击杀/死亡**"
              },
              {
                "type": "kmarkdown",
                "content": "**胜/负**"
              },
              {
                "type": "kmarkdown",
                "content": "**弃赛数**"
              },
              {
                "type": "plain-text",
                "content": `${warmup.wKills}-${warmup.wDeaths}`
              },
              {
                "type": "plain-text",
                "content": `${warmup.wWins}-${warmup.wLosses}`
              },
              {
                "type": "plain-text",
                "content": `${warmup.wAbandons}`
              }
            ]
          }
        },
        {
          "type": "action-group",
          "elements": [
            {
              "type": "button",
              "theme": "primary",
              "value": JSON.stringify({
                type: 'r6lookup',
                action: 'rank',
                data: {
                  user: user
                }
              }),
              "click": "return-val",
              "text": {
                "type": "plain-text",
                "content": "排位数据"
              }
            },
            {
              "type": "button",
              "theme": "primary",
              "value": JSON.stringify({
                type: 'r6lookup',
                action: 'casual',
                data: {
                  user: user
                }
              }),
              "click": "return-val",
              "text": {
                "type": "plain-text",
                "content": "休闲数据"
              }
            },
            {
              "type": "button",
              "theme": "primary",
              "value": JSON.stringify({
                type: 'r6lookup',
                action: 'picture',
                data: {
                  user: user
                }
              }),
              "click": "return-val",
              "text": {
                "type": "plain-text",
                "content": "获取图片"
              }
            }
          ]
        }
      ]
    }
  }
}

