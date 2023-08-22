import { Route, Routes } from 'react-router-dom';

//Admin Managment System
import ProfileAdmin from './components/AdminManagementSystem/ProfileAdmin';
import ManageAdmin from './components/AdminManagementSystem/ManageAdmin';
import AdminDashboard from './components/AdminManagementSystem/AdminDashboard';
import EditAdmin from './components/AdminManagementSystem/EditAdmin';
import AdminRepogen from './components/AdminManagementSystem/AdminReportfenarator';
import Header from './components/Header';
import AdminLogin from './components/AdminManagementSystem/AdminLogin';
import CustomerReportAdmin from './components/AdminManagementSystem/CustomerReportAdmin';
import DeliveryReportAdmin from './components/AdminManagementSystem/DeliveryReportAdmin';
import FarmerReportAdmin from './components/AdminManagementSystem/FarmerReportAdmin';

//Bidding Managment System
import CreateBids from './components/BiddingManagmentSystem/CreateBids';
import BiddingDetailsFarmer from './components/BiddingManagmentSystem/BiddingDetailsFarmer';
import SetPrice from './components/BiddingManagmentSystem/SetPrice';
import BidReport from './components/BiddingManagmentSystem/BidReport';
import SelectedBid from './components/BiddingManagmentSystem/SelectedBid';
import BidReportAdmin from "./components/BiddingManagmentSystem/BidReportAdmin";
import BidDetails from "./components/BiddingManagmentSystem/BidDetails";
import BidDetailsFarmer from './components/BiddingManagmentSystem/BidDetailsFarmer';
import Home from "./components/Home";
import BidStore from './components/BiddingManagmentSystem/BidStore';

//Stock Management System
import AddStock from "./components/StockManagement/AddStock";
import ManageItems from "./components/StockManagement/ManageItems";
import EditStock from './components/StockManagement/EditStock';
import InStock from './components/StockManagement/InStock';
import Stockreport from './components/StockManagement/Reportgenarate';
import StockDashboard from "./components/StockManagement/StockDashboard";

//Customer Managment System
import RegCustomer from './components/CustomerManagmentSystem/RegisterCustomer';
import LoginCustomer from './components/CustomerManagmentSystem/LoginCustomer';
import ProfileCustomer from './components/CustomerManagmentSystem/ProfileCustomer';
import OverviewCustomer from './components/CustomerManagmentSystem/OverviewCustomer';
import GenreportCustomer from './components/CustomerManagmentSystem/ReportGenerationCustomer';
import UpdateCustomer from './components/CustomerManagmentSystem/UpdateCustomer';

//Farmer Managmen System
import AddFarmer from './components/FarmerManagementSystem/RegFarmer';
import UpdateFarmer from './components/FarmerManagementSystem/UpdateFarmer';
import FarmerProfile from './components/FarmerManagementSystem/FarmerProfile';
import FarmerDash from './components/FarmerManagementSystem/FarmerDashboard';
import PasswordChange from './components/FarmerManagementSystem/changePWD';
import LoginFarmer from './components/FarmerManagementSystem/FarmerLog';
import CreateItem from './components/FarmerManagementSystem/CreateItem';


//Delevery Managment System
import DelDashboard from './components/DeliveryManagementSystem/DelDashboard';
import Register from './components/DeliveryManagementSystem/Register';
import DeliveryProfile from './components/DeliveryManagementSystem/DeliveryProfile';
import Allorders from './components/DeliveryManagementSystem/Allorders';
import AddAppointment from './components/DeliveryManagementSystem/AddAppointment';
import DeliveryLogin from './components/DeliveryManagementSystem/DeliveryLogin';
import Edit from './components/DeliveryManagementSystem/Edit';
import Genreport from'./components/DeliveryManagementSystem/Reportgen';

//Payment Managment System
import EditPayment from './components/PaymentManagementSystem/editPayment';
import Payment from "./components/PaymentManagementSystem/Payment";
import Paymentview from './components/PaymentManagementSystem/paymentview';
import handlePdfGeneration from './components/PaymentManagementSystem/report'

//Offer Managmet System
import Offertable from './components/OfferManagmentSystem/OfferTable';
import UpdateOffer from './components/OfferManagmentSystem/UpdateOffer';
import OfferPdf from './components/OfferManagmentSystem/OfferPdf';
import CreateOffer from './components/OfferManagmentSystem/CreateOffer';



import Store from './components/store';

import './App.css';

//CSS for Main Systems
import './Styles/style-admin.css';
import './Styles/styles-bidding.css';
import './Styles/styles-stock.css';
import './Styles/StylesCustomer.css'; 
import './Styles/styles-farmer.css';
import './Styles/style-delivery.css';
import './Styles/styles-payment.css';

// import './Styles/css/offermain.css';
import './Styles/css/offerpdfgen.css';
import './Styles/css/offertable.css';

//Navebar CSS
import './Header.css';
import './Footer.css';

//
import Footer from './components/Footer';







function App() {
  return (
    <div className="App">
      <Header/>
      

          <Routes>

            {/*Admin Managment System*/}
            <Route path='/createadmin' exact element={<ProfileAdmin/>}></Route>
            <Route path='/ManageAdmin' exact element={<ManageAdmin/>}></Route>
            <Route path='/AdminDashboard/:id' exact element={<AdminDashboard/>}></Route>
            <Route path='/EditAdmin/:id' exact element={<EditAdmin/>}></Route>
            <Route path='/Adminreport' exact element={<AdminRepogen/>}></Route>
            <Route path='/admin' exact element={<AdminLogin/>}></Route>
            <Route path='/reportGenCus' exact element={<CustomerReportAdmin/>}></Route>
            <Route path = '/adminDelreport' exact element = {<DeliveryReportAdmin/>}></Route>
            <Route path = '/adminfarmerreport' exact element = {<FarmerReportAdmin/>}></Route>
            <Route path = '/genaratereportbidAdmin' exact element = {<BidReportAdmin/>}></Route>



            {/* Bidding Managment System */}
            <Route path = '/createbid/:idNo' exact element = {<CreateBids/>}></Route>
            <Route path = '/biddetails' exact element = {<BiddingDetailsFarmer/>}></Route>
            <Route path = '/setpricebid/:bidID' exact element = {<SetPrice/>}></Route>
            <Route path = '/selectedbid/:id' exact element = {<SelectedBid/>}></Route>
            <Route path = '/genaratereportbid/:idNo' exact element = {<BidReport/>}></Route>
            <Route path = '/biddetails/:id' exact element = {<BidDetails/>}></Route>
            <Route path = '/biddetailsfarmer/:id' exact element = {<BidDetailsFarmer/>}></Route>
            <Route path = '/bidstore' exact element = {<BidStore/>}></Route>


            {/* Stock Managmen System */}
            <Route path='/AddStock' element={<AddStock/>} />
            <Route path='/StockDashboard' element={<StockDashboard/>} />
            <Route path='/EditStock/:id' element={<EditStock/>} />
            <Route path='/StockManageItems' element={<ManageItems/>} />
            <Route path='/Stockreport' element={<Stockreport/>} />
            <Route path='/InStock' element={<InStock/>} />



            {/* Consumer Managment System */}
            <Route path='/Customerregister' exact element={<RegCustomer/>}></Route>
            <Route path='/loginCustomer' exact element={<LoginCustomer/>}></Route>
            <Route path='/profileCustomer/:id' exact element={<ProfileCustomer/>}></Route>
            <Route path='/overviewCustomer/:id' exact element={<OverviewCustomer/>}></Route>
            <Route path='/Customerreport' exact element={<GenreportCustomer/>}></Route>
            <Route path='/updatecustomer/:id' exact element={<UpdateCustomer/>}></Route>


            {/* Farmer Managment System */}
            <Route path='/registerFarmer' exact element={<AddFarmer/>}></Route>
            <Route path='/updateFarmer/:id' exact element={<UpdateFarmer/>}></Route>
            <Route path='/profileFarmer/:id' exact element={<FarmerProfile/>}></Route>
            <Route path='/dashboardFarmer/:id' exact element={<FarmerDash/>}></Route>
            <Route path='/changePWDFarmer/:id' exact element={<PasswordChange/>}></Route>
            <Route path='/loginFarmer' exact element={<LoginFarmer/>}></Route>
            <Route path='/additemfar' exact element={<CreateItem/>}></Route>


            {/* Delevery Managment System */}
            <Route path = '/deldashboard' exact element = {<DelDashboard/>} ></Route>
            <Route path = '/Delregister' exact element = {<Register/>} ></Route>
            <Route path = '/profile/:id' exact element = {<DeliveryProfile/>}></Route>
            <Route path = '/editnow/:id' exact element = {<Edit/>}></Route>
            <Route path = '/order' exact element = {<Allorders/>}></Route>
            <Route path = '/deladd' exact element = {<AddAppointment/>}></Route>
            <Route path = '/dellogin' exact element = {<DeliveryLogin/>}></Route>
            <Route path = '/delreport' exact element = {<Genreport/>}></Route>


            {/* Payment Managment System */}
              <Route path='/Payment/:subtotal' exact element = {<Payment/>} />
              <Route path='/editpayment/:id' exact Component = {EditPayment} />
              <Route path='/paymentview' exact Component ={Paymentview} />
              <Route path='/report' exact Component={handlePdfGeneration}/>


            {/* Offer Managment System */}
            <Route path='/offertable' exact element={<Offertable/>}/>
            <Route path='/updateoffer/:id' exact element={<UpdateOffer/>}/>
            <Route path='/offerpdf' exact element={<OfferPdf/>}/>
            <Route path='/createoffer' exact element={<CreateOffer/>}/>

            {/* Common Routes */}
            <Route path = '/store' exact element = {<Store/>}></Route>
            <Route path = '/home' exact element = {<Home/>}></Route>


          </Routes>
          <Footer/>
    
    </div>
  );
}

export default App;

