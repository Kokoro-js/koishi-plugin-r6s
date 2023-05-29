import {createCanvas, loadImage} from "canvas";
import path from "path";
import {User, Ranked, Profile} from "./types";

export async function rankPicture(target: User, profile: Profile, rankInfo: Ranked, status: "online" | "away" | "dnd" | "offline") {
  const canvas = createCanvas(350, 500);
  const context = canvas.getContext('2d');

// Gradient background
      const bgGradient = context.createLinearGradient(0, 0, 350, 0);
      bgGradient.addColorStop(0, '#FFAFBD'); // Changed to a lighter color gradient
      bgGradient.addColorStop(1, '#ffc3a0');
      context.fillStyle = bgGradient;
      context.fillRect(0, 0, 350, 450); // Fill the complete canvas

      const rectOptions = {
        fill: 'rgba(0, 0, 0, 0.5)', // semi-transparent black to simulate frosted glass
        rx: 10,
        ry: 10,
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffsetX: 5,
        shadowOffsetY: 5,
        shadowBlur: 5,
      };
      const rank = Buffer.from('Z2l0aHViIGFoZGc2L2tvaXNoaS1wbHVnaW4tcjZzIA==', 'base64').toString();
      // top rectangle
      context.fillStyle = rectOptions.fill;
      context.shadowColor = rectOptions.shadowColor;
      context.shadowOffsetX = rectOptions.shadowOffsetX;
      context.shadowOffsetY = rectOptions.shadowOffsetY;
      context.shadowBlur = rectOptions.shadowBlur;
      context.fillRect(25, 20, 300, 80); // Increased height for better visibility
      // middle left rectangle
      context.fillRect(25, 125, 300, 150); // Reduced height for the middle rectangles
      // middle right rectangle
      // context.fillRect(185, 125, 140, 150); // Reduced height for the middle rectangles
      // bottom rectangle
      context.fillRect(25, 300, 300, 80); // Increased height for better visibility and repositioned closer to the middle rectangles
      const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(1, 'blue');
      context.fillStyle = gradient;
      context.font = `20px Sans`;
      context.fillText(`${target.username} (${target.platform})`, 110, 50);
      context.fillText(`等级：${profile.level}`, 110, 80);
      switch (status) {
        case "online": {
          context.fillStyle = 'green'
          context.fillText('在线', 270, 80)
          break
        }
        case "offline": {
          context.fillStyle = 'gray'
          context.fillText('离线', 270, 80)
          break
        }
        case "dnd": {
          context.fillStyle = 'red'
          context.fillText('请勿打扰', 270, 80)
          break
        }
        case "away": {
          context.fillStyle = 'yellow'
          context.fillText('离开', 270, 80)
          break
        }
      }
      context.fillStyle = "white";
      context.fillText(`MMR: ${rankInfo.rank.mmr}`, 95, 155)
      context.fillText(`K/D: ${rankInfo.kd}`, 215, 155)
      context.fillText(`胜率: ${rankInfo.winRate}`, 215, 195)
      context.fillText(`${rankInfo.rank.range}`, 95, 195)
      context.fillText(rank, 35, 435);
      context.fillText(`场数 ${rankInfo.matches}`, 35, 230)
      context.fillText(`胜场 ${rankInfo.wins}`, 130, 230)
      context.fillText(`败场 ${rankInfo.losses}`, 225, 230)
      context.fillText(`击杀 ${rankInfo.kills}`, 35, 260)
      context.fillText(`死亡 ${rankInfo.deaths}`, 130, 260)
      context.fillText(`弃赛 ${rankInfo.abandons}`, 225, 260)
      context.fillText(`最高 MMR：${rankInfo.maxRank.mmr}`, 130, 325)
      if (rankInfo.topRankPosition > 0) context.fillText(`冠军排名：${rankInfo.topRankPosition}`, 130, 350)
      context.fillText(`赛季：${profile.season.shorthand} - ${profile.season.id}`, 130, 375)
      // create image
      const svgRankPath = path.join(__dirname, 'assets', 'rank', `${rankInfo.rank.slug}.svg`);
      const svgTopRankPath = path.join(__dirname, 'assets', 'rank', `${rankInfo.maxRank.slug}.svg`);
      try {
        const rank = await loadImage(svgRankPath);
        const maxRank = await loadImage(svgTopRankPath);
        const avast = await loadImage(target.avatars["146"])

        context.drawImage(avast, 20, 25, 80, 80)
        context.drawImage(rank, 20, 125, 80, 80);
        context.drawImage(maxRank, 20, 300, 80, 80);
      } catch (err) {
        console.error(err);
      }
      return canvas.toBuffer('image/png')
  }
