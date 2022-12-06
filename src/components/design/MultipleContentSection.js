import SectionWIthIcon from './SectionWIthIcon';
import {Box, Stack} from '@mui/material';
import Title from './Title';
import PropTypes from 'prop-types';

function MultipleContentSection(props) {
  return (
    <Box sx={{my: 14}}>
      <Title title={props.title} />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {props.contents?.map((content, index) => (
          <SectionWIthIcon
            key={index}
            icon={content.icon}
            title={content.title}
            color={content.color}
            bgcolor={content.bgcolor}
            details={content.details}
            hideIcon={content.hideIcon}
          />
        ))}
      </Box>
    </Box>
  );
}

export default MultipleContentSection;
MultipleContentSection.propTypes = {
  title: PropTypes.any,
  contents: PropTypes.array,
};
