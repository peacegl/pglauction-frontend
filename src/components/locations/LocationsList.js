import axios from 'axios';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import {useState, useEffect} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

export default function LocationsList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (locations.length == 0) {
      (async function () {
        try {
          const response = await axios.get(
            process.env.NEXT_PUBLIC_BASE_URL + 'locations?items_per_page=-1',
          );
          if (response.status == 200 && response.data.result) {
            setLocations(response.data.data);
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);
  const handleToggle = (id) => () => {};

  return (
    <List>
      {locations?.length == 0 && (
        <Typography color='primary' sx={{textAlign: 'center'}}>
          No Region
        </Typography>
      )}
      {locations?.length > 0 &&
        locations?.map((value) => (
          <ListItem key={value.id} disablePadding sx={{mb: 1}}>
            <ListItemButton onClick={handleToggle(value.id)} dense sx={{py: 1}}>
              <ListItemText
                id={value.id}
                primary={
                  <Typography color='primary'>{value.location_name}</Typography>
                }
              />
              <Badge
                badgeContent={value.auction_items_count}
                color='primary'
                sx={{mx: 2}}
                max={999}
              />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
}
