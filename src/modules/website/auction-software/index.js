
import { Container } from '@mui/material';
import auctionImage from 'assets/auction-software/auctionPageImage.webp';
import contentBackgroundImg from 'assets/auction-software/cta-bg.webp';
import landingImage from 'assets/auction-software/demo-image.jpg'
import { useRouter } from 'next/router';
export default function AuctionSoftware() {
  const router = useRouter();
  const services = [
    {
      title: "Customized Auction Software",
      description: `Our motto is elegance and simplicity. PGT Auction Software can be deployed as is or it 
      can be further developed to meet your customized needs. Having a large team of programmers,
      we will focus on your business and make sure to develop exactly what you desire!
      `,
      icon: <svg width="32px" height="32px" viewBox="-42.5 0 310.5 310.5" xmlns="http://www.w3.org/2000/svg">
        <g id="lamp" transform="translate(-521.713 -3050.916)">
          <path id="Path_18" data-name="Path 18" d="M714.116,3083.918a111.848,111.848,0,0,0-79.645-33c-62.1,0-112.758,50.542-112.758,112.668a112.287,112.287,0,0,0,55.269,97.068v68.041a32.735,32.735,0,0,0,32.458,32.723h50.28c17.648,0,32.262-14.7,32.262-32.723v-68.1a112.649,112.649,0,0,0,22.134-176.675Zm-54.4,253.5H609.44c-4.32,0-8.458-4.14-8.458-8.723v-19.277h67v19.277C667.982,3333.276,663.935,3337.416,659.72,3337.416Zm14.738-94.89a11.9,11.9,0,0,0-6.476,10.848v32.042h-21v-78h29.6a12,12,0,1,0,0-24H592.99a12,12,0,1,0,0,24h29.992v78h-22v-31.989a11.894,11.894,0,0,0-6.481-10.849c-30.022-14.915-48.551-45.183-48.551-78.994a88.5,88.5,0,0,1,177,0C722.947,3197.355,704.461,3227.6,674.458,3242.526Z" fill="currentColor" />
        </g>
      </svg>,
      color: '#13c4a1'
    },
    {
      title: "Schedule Auction",
      description: `With PGT Online Auction software, you can run multiple
      auctions at the same time having different listing in each
      auction. Having auction tools at your hand, you can set the
      buy now price, pre-bid, and set customized timing for each
      auction.`,
      icon: <svg fill="currentColor" width="32px" height="32px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
        <path d="M960 0c529.355 0 960 430.645 960 960s-430.645 960-960 960S0 1489.355 0 960c0-172.687 46.419-341.986 134.174-489.6l97.017 57.713C153.826 658.22 112.94 807.529 112.94 960c0 467.125 379.934 847.059 847.059 847.059 467.125 0 847.059-379.934 847.059-847.059 0-448.038-349.779-816-790.588-845.139v223.963H903.529V0ZM322.334 242.372l482.259 482.372c44.612-29.704 97.92-47.097 155.407-47.097 155.633 0 282.353 126.72 282.353 282.353S1115.633 1242.353 960 1242.353 677.647 1115.633 677.647 960c0-57.487 17.393-110.795 47.097-155.407L242.372 322.334l79.962-79.962ZM960 790.588c-93.402 0-169.412 76.01-169.412 169.412s76.01 169.412 169.412 169.412 169.412-76.01 169.412-169.412S1053.402 790.588 960 790.588Z" fill-rule="evenodd" />
      </svg>,
      color: '#6610f2'
    },
    {
      title: "Network",
      description: `With PGT Auction software, you are going to build an online
      network of buyers and sellers with having their own unique
      portal and bidding tools ready to use at their convenience. At
      the heart of every business is customer, with auction software
      you will have better insights about your customer and be able
      to a build a large marketplace of sellers, customers, and
      admins.`,
      icon: <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21M12 8V12M6.5 12V16M17.5 12V16M10.1 8H13.9C14.4601 8 14.7401 8 14.954 7.89101C15.1422 7.79513 15.2951 7.64215 15.391 7.45399C15.5 7.24008 15.5 6.96005 15.5 6.4V4.6C15.5 4.03995 15.5 3.75992 15.391 3.54601C15.2951 3.35785 15.1422 3.20487 14.954 3.10899C14.7401 3 14.4601 3 13.9 3H10.1C9.53995 3 9.25992 3 9.04601 3.10899C8.85785 3.20487 8.70487 3.35785 8.60899 3.54601C8.5 3.75992 8.5 4.03995 8.5 4.6V6.4C8.5 6.96005 8.5 7.24008 8.60899 7.45399C8.70487 7.64215 8.85785 7.79513 9.04601 7.89101C9.25992 8 9.53995 8 10.1 8ZM15.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7951 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V17.6C21 17.0399 21 16.7599 20.891 16.546C20.7951 16.3578 20.6422 16.2049 20.454 16.109C20.2401 16 19.9601 16 19.4 16H15.6C15.0399 16 14.7599 16 14.546 16.109C14.3578 16.2049 14.2049 16.3578 14.109 16.546C14 16.7599 14 17.0399 14 17.6V19.4C14 19.9601 14 20.2401 14.109 20.454C14.2049 20.6422 14.3578 20.7951 14.546 20.891C14.7599 21 15.0399 21 15.6 21ZM4.6 21H8.4C8.96005 21 9.24008 21 9.45399 20.891C9.64215 20.7951 9.79513 20.6422 9.89101 20.454C10 20.2401 10 19.9601 10 19.4V17.6C10 17.0399 10 16.7599 9.89101 16.546C9.79513 16.3578 9.64215 16.2049 9.45399 16.109C9.24008 16 8.96005 16 8.4 16H4.6C4.03995 16 3.75992 16 3.54601 16.109C3.35785 16.2049 3.20487 16.3578 3.10899 16.546C3 16.7599 3 17.0399 3 17.6V19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>,
      color: '#ffb700'
    }
  ];
  const services2 = [
    {
      title: "Branding",
      description: `You will have full control over the branding. 
      The auction software will be fully customized to your business needs.`,
      icon: <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5276 2H7.47201C6.26919 2 5.66778 2 5.18448 2.2987C4.70117 2.5974 4.43221 3.13531 3.8943 4.21114L2.49068 7.75929C2.16639 8.57905 1.88266 9.54525 2.42854 10.2375C2.79476 10.7019 3.36244 11 3.99978 11C5.10435 11 5.99978 10.1046 5.99978 9C5.99978 10.1046 6.89522 11 7.99978 11C9.10435 11 9.99978 10.1046 9.99978 9C9.99978 10.1046 10.8952 11 11.9998 11C13.1044 11 13.9998 10.1046 13.9998 9C13.9998 10.1046 14.8952 11 15.9998 11C17.1044 11 17.9998 10.1046 17.9998 9C17.9998 10.1046 18.8952 11 19.9998 11C20.6371 11 21.2048 10.7019 21.5711 10.2375C22.117 9.54525 21.8333 8.57905 21.509 7.75929L20.1054 4.21114C19.5674 3.13531 19.2985 2.5974 18.8152 2.2987C18.3319 2 17.7305 2 16.5276 2Z" fill="currentColor" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20 21.25H22C22.4142 21.25 22.75 21.5858 22.75 22C22.75 22.4142 22.4142 22.75 22 22.75H2C1.58579 22.75 1.25 22.4142 1.25 22C1.25 21.5858 1.58579 21.25 2 21.25H4L4 12.5C4.74363 12.5 5.43309 12.2681 6 11.8727C6.56692 12.2681 7.25638 12.5 8 12.5C8.74363 12.5 9.43309 12.2681 10 11.8727C10.5669 12.2681 11.2564 12.5 12 12.5C12.7436 12.5 13.4331 12.2681 14 11.8727C14.5669 12.2681 15.2564 12.5 16 12.5C16.7436 12.5 17.4331 12.2681 18 11.8727C18.5669 12.2681 19.2564 12.5 20 12.5L20 21.25ZM9.5 21.25H14.5V18.5C14.5 17.5654 14.5 17.0981 14.299 16.75C14.1674 16.522 13.978 16.3326 13.75 16.2009C13.4019 16 12.9346 16 12 16C11.0654 16 10.5981 16 10.25 16.2009C10.022 16.3326 9.83261 16.522 9.70096 16.75C9.5 17.0981 9.5 17.5654 9.5 18.5V21.25Z" fill="currentColor" />
      </svg>
    },
    {
      title: "No Commission",
      description: `Your business will be able to auction and sell items with having no worry to share its profit or give commission. It will be yours and yours only!`,
      icon: <svg width="32px" height="32px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.0433 4C19.0249 4 14.4518 5.65746 11.7469 7.01231C11.5031 7.13439 11.2746 7.25402 11.0622 7.36975C10.642 7.59878 10.2852 7.81256 10 8L13.0777 12.5307L14.5263 13.1074C20.1889 15.9645 27.7825 15.9645 33.4451 13.1074L35.09 12.254L38 8C37.5736 7.7157 36.9838 7.37078 36.2581 7.00403C36.2139 6.98167 36.1692 6.95924 36.1239 6.93673C33.4307 5.59663 28.9687 4 24.0433 4ZM16.8852 9.12906C15.7776 8.92471 14.6893 8.64286 13.662 8.31949C16.1968 7.19394 19.9743 6 24.0433 6C26.8626 6 29.5282 6.57325 31.733 7.2991C29.1492 7.66384 26.3919 8.27955 23.7654 9.03939C21.6987 9.63727 19.2829 9.57147 16.8852 9.12906Z" fill="currentColor" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M34.6185 14.7556L34.3461 14.893C28.1168 18.036 19.8546 18.036 13.6254 14.893L13.3664 14.7624C4.00908 25.0304 -5.80757 44.2853 24.0433 43.9968C53.8737 43.7085 43.9033 24.6761 34.6185 14.7556ZM25.7113 22H22.2887V23.6C21.1765 23.5974 20.1071 23.9999 19.3068 24.7222C18.5067 25.4443 18.0388 26.4294 18.0023 27.4687C17.9658 28.508 18.3636 29.5197 19.1113 30.2894C19.8591 31.0591 20.8981 31.5263 22.0081 31.592L22.2887 31.6H25.7113L25.8653 31.6128C26.0626 31.6462 26.2411 31.7433 26.3696 31.8872C26.4981 32.031 26.5686 32.2126 26.5686 32.4C26.5686 32.5874 26.4981 32.769 26.3696 32.9128C26.2411 33.0567 26.0626 33.1538 25.8653 33.1872L25.7113 33.2H18.8661V36.4H22.2887V38H25.7113V36.4C26.8235 36.4026 27.8929 36.0001 28.6932 35.2778C29.4933 34.5557 29.9612 33.5706 29.9977 32.5313C30.0342 31.492 29.6364 30.4803 28.8887 29.7106C28.1409 28.9409 27.1019 28.4737 25.9919 28.408L25.7113 28.4H22.2887L22.1347 28.3872C21.9374 28.3538 21.7589 28.2567 21.6304 28.1128C21.5019 27.969 21.4314 27.7874 21.4314 27.6C21.4314 27.4126 21.5019 27.231 21.6304 27.0872C21.7589 26.9433 21.9374 26.8462 22.1347 26.8128L22.2887 26.8H29.1339V23.6H25.7113V22Z" fill="currentColor" />
      </svg>
    },
    {
      title: "Customized as Per Your Needs",
      description: `Being a small startup, we will assume your business like ours and make sure that the auction will fully align to the theme of your industry.`,
      icon: <svg fill="currentColor" height="32px" width="32px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48" >
        <path id="Layer_2_00000092431144745784285970000001917386071455724723_" d="M39.4,22.6c-0.7-0.8-1.9-0.8-2.7-0.1
     c0,0-0.1,0.1-0.1,0.1c-1.2,1.2-2.6,2.3-4.1,3.1l-3.9-9.2C30.8,15,32,12.6,32,10c0-4.4-3.6-8-8-8s-8,3.6-8,8c0,2.6,1.3,5.1,3.4,6.6
     l-3.9,9.1c-1.5-0.8-2.9-1.9-4.1-3.1c-0.7-0.8-1.9-0.8-2.7-0.1c0,0-0.1,0.1-0.1,0.1c-0.8,0.8-0.8,2.1,0,2.9c1.6,1.6,3.3,2.9,5.3,4
     l-3.2,7.4l-1.1,8.5c0,0.3,0.2,0.5,0.5,0.5c0.2,0,0.3-0.1,0.4-0.2l6.8-14.8c1.5,0.5,3.1,0.9,4.7,1V33c0,1.1,0.9,2,2,2s2-0.9,2-2v-1.1
     c1.6-0.1,3.2-0.5,4.8-1l6.7,14.8c0.2,0.5,1,0.3,1-0.3l-1.2-8.6l-3.2-7.3c1.9-1.1,3.7-2.4,5.3-4C40.2,24.7,40.1,23.4,39.4,22.6z
      M24,6c2.2,0,4,1.8,4,4s-1.8,4-4,4s-4-1.8-4-4S21.8,6,24,6z M26,27.8V27c0-1.1-0.9-2-2-2s-2,0.9-2,2v0.8c-1-0.1-2-0.3-3-0.6l4.1-9.2
     h1.8l4.2,9.3C28.1,27.6,27,27.7,26,27.8z"/>
      </svg>
    }
  ]
  return (
    <>
      <div className='auction-software-wrapper'>

        <div className='landing' style={{ backgroundImage: `url('${landingImage.src}')` }}>
          <div className='layer'>
            <h1>
              PGT Auction Software Enterprise
            </h1>
            <h3>Complete Online Auction Solution customized as per your needs and requirements!</h3>
          </div>
        </div>
        <Container style={{ maxWidth: '1320px', }} sx={{ px: 3 }}>
          <div style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
            <img
              width='100%'
              src={auctionImage.src}
              alt="pgtsoftware auction image"
            />
          </div>
          <div
            className="demo-card"
          >
            <div>
              <h4 style={{ paddingBottom: '10px', fontSize: '17px' }}>Admin Demo Credentials</h4>
              <div className='font-inter' style={{ opacity: 0.7, fontSize: '16px' }}>
                <b>Username</b> : demo
              </div>
              <div className='font-inter' style={{ opacity: 0.7, fontSize: '16px' }}>
                <b>Password</b> : password
              </div>
            </div>

            <div>
              <h4 style={{ paddingBottom: '10px', fontSize: '17px' }}>Customer Demo</h4>
              <div className='font-inter' style={{ opacity: 0.7, fontSize: '16px' }}>Just create a new customer account</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
              <a
                onClick={() => router.push('/signin')}
                className="auction-preview-button font-inter"
              >
                Live Preview
              </a>
            </div>
          </div>
          <div style={{ paddingTop: '40px', paddingBottom: '20px' }}>
            <h2>Your Customized Online Auction Software</h2>
            <p className='font-inter' style={{ paddingTop: '10px', opacity: 0.8, fontSize: '16px' }}>Run your customized online auction software for any standard industry customized as per your needs.</p>
          </div>
          <div class="service-container">
            {services.map((service, index) => {
              return <div
                key={index}
                className="service-card"
              >
                <div className='card-avatar' style={{ background: service.color }}>
                  {service.icon}
                </div>
                <h3 style={{ fontWeight: 600 }}>
                  {service.title}
                </h3>
                <p className='font-inter' >
                  {service.description}
                </p>
              </div>
            })}
          </div>

          <div style={{ paddingTop: '5rem', paddingBottom: '20px' }}>
            <h2 style={{ paddingBottom: '15px' }}>Why PGT Auction Software?</h2>
            <div className='service-container'>
              {services2.map((service, index) => {
                return <div key={index} className='service-card2'>
                  <div>
                    <div className='avatar2'>{service.icon}</div>
                  </div>
                  <div>
                    <h3>{service.title}</h3>
                    <p className='font-inter'>{service.description}</p>
                  </div>
                </div>
              })}
            </div>
          </div>

        </Container>
        <div className='contact-section' style={{ backgroundImage: `url(${contentBackgroundImg.src})` }}>
          <div className='content'>
            <p>So what is next?</p>
            <h3>Are You Ready? Let's get to work!</h3>
            <button onClick={() => { router.push('/contact-us') }}>Contact US</button>
          </div>
        </div>
      </div >
    </>
  );
}
