import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from '../../../components/cards/MainCard';
import TotalIncomeCard from '../../../components/cards/skeleton/TotalIncomeCard';

// assets
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import { ACTIVESERVICE, SERVICES } from '../../../store/queryKeys';
import { getActiveService } from '../../../services/endpointService';
import { useGetData } from '../../../hooks/useGetData';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.success.main,
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.success.light} -50.94%, rgba(0,255,0,0.39) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.success.light} -14.02%, rgba(0,255,0,0.39) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const TotalIncomeLightCard = () => {
    const theme:any = useTheme();
    const {isLoading, data, isError, error, isFetching, refetch} = useGetData(ACTIVESERVICE, getActiveService);

    return (
        <>
            {isLoading || isError ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.success.dark,
                                            color: "#fff"
                                        }}
                                    >
                                        <MiscellaneousServicesIcon fontSize="inherit" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={<Typography sx={{ color: '#fff' }} variant="h4">{data.description}</Typography>}
                                    secondary={
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ color: 'primary.light', mt: 0.25 }}
                                        >
                                            Active Service
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalIncomeLightCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalIncomeLightCard;
