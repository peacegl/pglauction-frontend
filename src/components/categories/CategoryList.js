import {useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Badge from '@mui/material/Badge';
import ListItemText from '@mui/material/ListItemText';
import Axios from 'axios';

export default function CheckboxList() {
  const [checked, setChecked] = useState([0]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categories.length == 0) {
      (async function () {
        const response = await Axios.get(
          process.env.NEXT_PUBLIC_BASE_URL + 'categories?items_per_page=-1',
        );
        if (response.status == 200 && response.data.result) {
          setCategories(response.data.data);
        }
      })();
    }
  }, []);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List>
      {categories?.map((value) => (
        <ListItem key={value.id} disablePadding sx={{mb: 1}}>
          <ListItemButton onClick={handleToggle(value.id)} dense sx={{py: 1}}>
            <ListItemText id={value.id} primary={value.category_name} />
            <Badge
              badgeContent={value.auction_items_count}
              color='primary'
              sx={{mx: 2}}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
