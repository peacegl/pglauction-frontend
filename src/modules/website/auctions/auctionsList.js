import TodayAuctions from './todayAuction/todayAcutions';
import UpComingAuctions from './upcomingAuction/upComingAcutions';

const AuctionsList = () => {
  return (
    <>
      <TodayAuctions />
      <UpComingAuctions />
    </>
  );
};

export default AuctionsList;
