
const PlanSelector = (props) => {
  // const { plans } = props;
  const plans = [
    {
      identifier: '',
      image: '',
      name: '',
      shortName: '',
      organization: {
        abbreviation: '',
      },
      active: '',
    },
    {
      identifier: '',
      image: '',
      name: '',
      shortName: '',
      organization: {
        abbreviation: '',
      },
      active: '',
    },
    {
      identifier: '',
      image: '',
      name: '',
      shortName: '',
      organization: {
        abbreviation: '',
      },
      active: '',
    },
  ];

  return (
    <div>
      / Ilmasto
    </div>
  )
};

export default PlanSelector;

/*
plan {
  identifier
  image {
    rendition(size: "128x128", crop: true) {
      src
    }
  }
  name
  shortName
  organization {
    name
  }
}
*/