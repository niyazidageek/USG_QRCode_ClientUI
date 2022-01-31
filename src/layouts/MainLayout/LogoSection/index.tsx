import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import Logo from '../../../assets/images/logo.png'
import TimesLogo from '../../../assets/images/thetimes.png'
import config from '../../../config';

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={'/'}>
        <img width={'150px'} src={TimesLogo} alt="" />
    </ButtonBase>
);

export default LogoSection;
