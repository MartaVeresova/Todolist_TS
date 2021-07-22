import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

export const TriggersTooltips = () => {
    const [open, setOpen] = useState(false);

    const handleTooltipOpen = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Grid container direction={'row'} justify={'flex-end'} alignItems={'center'} style={{width: '300px'}}>
                <Grid item>
                    <Tooltip
                        open={open}
                        placement="right-start"
                        title={
                            <Grid item style={{width: '150px'}}>
                                <p>To log in get registered
                                    <a href={'https://social-network.samuraijs.com/'}>here</a>
                                </p>
                                <p>Test Email: free@samuraijs.com</p>
                                <p>Test Password: free</p>
                            </Grid>
                        }
                    >
                        <Grid item>
                            <InfoIcon color={'action'} onClick={handleTooltipOpen}/>
                        </Grid>
                    </Tooltip>
                </Grid>
            </Grid>
        </div>
    );
}