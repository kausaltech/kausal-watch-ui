import { useEffect, useState } from 'react';

import Icon from 'components/common/Icon';
import { useTranslations } from 'next-intl';
import { Range, getTrackBackground } from 'react-range';
import { ButtonToggle } from 'reactstrap';
import styled, { useTheme } from 'styled-components';

const SectionWrapper = styled.div`
  display: flex;
  min-width: 320px;
  padding: 0.75rem 0;
`;

const RangeWrapper = styled.div`
  display: flex;
  flex: 0 1 150px;
  margin: 0 0.5rem;
`;

const YearDescription = styled.div`
  font-size: 0.75rem;
  line-height: 1;
`;

const ActiveYear = styled.div`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
`;

const ActiveYearDisplay = styled.div`
  flex: 0 1 100px;
  margin: 0;
  padding: 0.25rem 0 0.25rem;
  text-align: center;

  .btn {
    color: ${(props) => props.theme.graphColors.grey050};
  }
`;

type ThumbProps = {
  $dragged: boolean;
  color: string;
};

const Thumb = styled.div<ThumbProps>`
  height: 28px;
  width: 28px;
  border-radius: 14px;
  background-color: ${(props) => (props.$dragged ? props.color : props.color)};
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    box-shadow: 0 0 0 0.25rem ${(props) => props.theme.inputBtnFocusColor};
  }
`;

const StyledButtonToggle = styled(ButtonToggle)`
  &:focus {
    box-shadow: 0 0 0 0.25rem ${(props) => props.theme.inputBtnFocusColor};
  }
`;

type RangeSelectorProps = {
  min: number;
  max: number;
  referenceYear: number | null;
  handleChange: (range: number[]) => void;
  defaultMin: number;
  defaultMax: number;
};

const RangeSelector = (props: RangeSelectorProps) => {
  const { min, max, referenceYear, handleChange, defaultMin, defaultMax } = props;

  const t = useTranslations();
  const theme = useTheme();
  const [referenceYearActive, setReferenceYearActive] = useState(
    referenceYear !== null ? referenceYear === defaultMin : false
  );
  const [values, setValues] = useState(
    referenceYearActive ? [defaultMax] : [defaultMin, defaultMax]
  );

  useEffect(() => {
    handleChange([defaultMin, defaultMax]);
  }, [defaultMin, defaultMax]);

  const handleSliderChange = (changedValues: number[]) => {
    setValues(changedValues);
    const newRange = referenceYearActive
      ? [referenceYear!, changedValues[0]]
      : [changedValues[0], changedValues[1]];
    handleChange(newRange);
  };

  const handleReferenceYear = (referenceYearIsActive: boolean) => {
    if (referenceYearIsActive) {
      setReferenceYearActive(true);
      setValues([values[1]]);
      handleChange([referenceYear!, values[1]]);
    } else {
      setReferenceYearActive(false);
      setValues([min, values[0]]);
      handleChange([min, values[0]]);
    }
  };

  return (
    <SectionWrapper>
      <ActiveYearDisplay>
        <YearDescription>{t('comparison-year')}</YearDescription>
        <ActiveYear>{referenceYearActive ? referenceYear : values[0]}</ActiveYear>
        {referenceYear && (
          <StyledButtonToggle
            color="link"
            size="sm"
            outline
            active={referenceYearActive}
            onClick={() => handleReferenceYear(!referenceYearActive)}
          >
            {referenceYearActive ? (
              <span>
                <Icon name="pencil" />
                {` ${t('edit')}`}
              </span>
            ) : (
              <span>
                <Icon name="version" /> {referenceYear}
              </span>
            )}
          </StyledButtonToggle>
        )}
      </ActiveYearDisplay>
      {referenceYearActive ? (
        <RangeWrapper>
          <Range
            key="Reference"
            step={1}
            min={min}
            max={max}
            values={values}
            onChange={(values) => handleSliderChange(values)}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: '36px',
                  display: 'flex',
                  width: '100%',
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: '5px',
                    width: '100%',
                    borderRadius: '4px',
                    background: getTrackBackground({
                      values,
                      colors: [theme.brandDark, theme.graphColors.grey030],
                      min,
                      max,
                    }),
                    alignSelf: 'center',
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged, index }) => (
              <Thumb
                {...props}
                $dragged={isDragged}
                style={{
                  ...props.style,
                }}
                color={theme.brandDark}
              >
                <Icon name="caretLeft" color="#eee" />
              </Thumb>
            )}
          />
        </RangeWrapper>
      ) : (
        <RangeWrapper>
          <Range
            key="noReference"
            step={1}
            min={min}
            max={max}
            values={values}
            onChange={(values) => handleSliderChange(values)}
            renderTrack={({ props, children }) => (
              <div
                aria-hidden="true"
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: '36px',
                  display: 'flex',
                  width: '100%',
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: '5px',
                    width: '100%',
                    borderRadius: '4px',
                    background: getTrackBackground({
                      values,
                      colors: [
                        theme.graphColors.grey030,
                        theme.brandDark,
                        theme.graphColors.grey030,
                      ],
                      min,
                      max,
                    }),
                    alignSelf: 'center',
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged, index }) => (
              <Thumb
                {...props}
                $dragged={isDragged}
                style={{
                  ...props.style,
                }}
                color={theme.brandDark}
              >
                {index === 0 ? (
                  <Icon name="caretRight" color={theme.graphColors.grey000} />
                ) : (
                  <Icon name="caretLeft" color={theme.graphColors.grey000} />
                )}
              </Thumb>
            )}
          />
        </RangeWrapper>
      )}
      <ActiveYearDisplay>
        <YearDescription>{t('target-year')}</YearDescription>
        <ActiveYear>{referenceYearActive ? values[0] : values[1]}</ActiveYear>
      </ActiveYearDisplay>
    </SectionWrapper>
  );
};

export default RangeSelector;
