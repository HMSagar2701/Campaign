import web3 from './web3'
import CampaignFactory from './build/ CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xf26F3849A2fB4AC5111ECF235EcA81afBEd51489'
);

export default instance;