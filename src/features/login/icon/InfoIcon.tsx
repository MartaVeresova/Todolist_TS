import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

export const TriggersTooltips = () => {
    console.log('TriggersTooltips')
    const [open, setOpen] = useState(false);

    const handleTooltipOpen = () => {
        setOpen(!open);
    }


    return (
        <Grid container direction={'row'} justify={'center'} alignItems={'center'} style={{width: '300px'}}>
            <Grid item>
                <Tooltip
                    open={open}
                    placement="top-start"
                    title={
                        <Grid item style={{width: '150px'}}>
                            {/*<p>To log in get registered*/}
                            {/*    <Link href={'https://social-network.samuraijs.com/'}>here</Link>*/}
                            {/*</p>*/}
                            <p>Test Email: free@samuraijs.com</p>
                            <p>Test Password: free</p>
                        </Grid>
                    }
                >
                    <Grid item>
                        <InfoIcon style={{marginTop: '3px'}} color={'inherit'} onClick={handleTooltipOpen}/>
                    </Grid>
                </Tooltip>
            </Grid>
        </Grid>
    );
}