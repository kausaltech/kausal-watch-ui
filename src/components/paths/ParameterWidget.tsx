import { forwardRef, useEffect, useRef, useState } from 'react';

import { gql, useMutation, useReactiveVar } from '@apollo/client';
import { useFocusable } from '@react-aria/focus';
import { useTranslations } from 'next-intl';
import { Range, getTrackBackground } from 'react-range';
import styled, { useTheme } from 'styled-components';

import { ParameterInterface } from '@/common/__generated__/paths/graphql';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Tooltip, { TooltipTrigger } from '@/components/common/Tooltip';
import { activeScenarioVar } from '@/context/paths/cache';
import { usePaths } from '@/context/paths/paths';
import { getHttpHeaders } from '@/utils/paths/paths.utils';

const RangeWrapper = styled.div`
  display: flex;
  max-width: 320px;
`;

const WidgetWrapper = styled.div`
  font-size: 0.8rem;

  .form-check-input {
    border-color: ${(props) => props.theme.themeColors.dark};
    &:checked {
      background-color: ${(props) => props.theme.brandDark};
      border-color: ${(props) => props.theme.brandDark};
    }
  }

  .form-check-label {
    margin-left: 0.5rem;
    line-height: 1;
  }
`;

const RangeValue = styled.div`
  display: flex;
  white-space: nowrap;
  min-width: 75px;
  margin-left: 1rem;
  line-height: 3;
`;

const Thumb = styled.div<{ $dragged: boolean }>`
  height: 20px;
  width: 20px;
  border-radius: 16px;
  background-color: ${(props) => (props.$dragged ? props.color : props.color)};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 6px #aaa;
`;

const StyledResetButton = styled(Button)`
  padding: 0;
`;

const SET_PARAMETER = gql`
  mutation SetParameter(
    $parameterId: ID!
    $boolValue: Boolean
    $numberValue: Float
    $stringValue: String
  ) {
    setParameter(
      id: $parameterId
      boolValue: $boolValue
      numberValue: $numberValue
      stringValue: $stringValue
    ) {
      ok
      parameter {
        isCustomized
        ... on BoolParameterType {
          boolValue: value
          boolDefaultValue: defaultValue
        }
      }
    }
  }
`;

const NumberWidget = (props) => {
  const t = useTranslations();
  const {
    id,
    initialValue,
    defaultValue,
    min,
    max,
    isCustomized,
    handleChange,
    loading,
    description,
    unit,
    step,
  } = props;
  const theme = useTheme();
  const [values, setValues] = useState([initialValue]);

  useEffect(() => {
    setValues([initialValue]);
  }, [initialValue]);

  const handleSlide = (newValues) => {
    handleChange({ parameterId: id, numberValue: newValues[0] });
  };

  if (!min || !max) return null;

  const Reset = () =>
    defaultValue !== null ? (
      <StyledResetButton
        id="reset-button"
        color="link"
        size="sm"
        outline
        onClick={() => handleChange({ parameterId: id, numberValue: defaultValue })}
        aria-label={t('reset-button')}
      >
        <Icon name="version" />
      </StyledResetButton>
    ) : null;

  return (
    <WidgetWrapper>
      <div>{description}</div>
      <RangeWrapper>
        <Range
          key="Base"
          step={step ?? 1}
          min={min}
          max={max}
          values={values}
          onChange={(vals) => setValues(vals)}
          onFinalChange={(vals) => handleSlide(vals)}
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
                disabled={loading}
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
          renderThumb={({ props, isDragged }) => (
            <Thumb
              {...props}
              $dragged={isDragged}
              style={{
                ...props.style,
              }}
              color={theme.brandDark}
              aria-label={t('thumbSliderLabel')}
            />
          )}
        />
        <RangeValue>{`${values[0].toFixed(0)} ${unit?.htmlShort || ''}`}</RangeValue>
        {isCustomized ? <Reset /> : null}
      </RangeWrapper>
    </WidgetWrapper>
  );
};

type BoolWidgetProps = {
  parameter: ParameterInterface;
  handleChange: (opts: { parameterId: string; boolValue: boolean }) => void;
  loading: boolean;
  WidgetWrapper: typeof WidgetWrapper;
  hideLabel?: boolean;
};

export const BoolWidget = (props: BoolWidgetProps) => {
  const { parameter, handleChange, loading, WidgetWrapper, hideLabel = false } = props;
  const { id, boolValue, isCustomized, isCustomizable } = parameter;
  const t = useTranslations();

  const label = parameter.label || parameter.description || t('will_be_implemented');

  // Solution for non-button components triggering tooltip: https://github.com/adobe/react-spectrum/issues/6142
  const FocusableInput = forwardRef((props, ref) => {
    // forwardRef doesn't guarantee a ref, so need to create a backup one so that we have a ref to our trigger every time
    let backupRef = useRef(null);
    let determinedRef = ref ?? backupRef;
    const { focusableProps } = useFocusable(props, determinedRef);
    // if display: block is used it'll take the entire width and render the tooltip off screen
    return <input ref={determinedRef} {...focusableProps} {...props} />;
  });

  if (!isCustomizable) return null;
  return (
    <WidgetWrapper className="form-check form-switch">
      <TooltipTrigger>
        <FocusableInput
          className="form-check-input"
          type="checkbox"
          role="switch"
          id={id!}
          name={id!}
          checked={boolValue!}
          onChange={() => handleChange({ parameterId: id!, boolValue: !boolValue })}
          disabled={loading}
          style={{ transform: 'scale(1.5)' }}
        />
        {!hideLabel && (
          <label className="form-check-label" htmlFor={id!}>
            {label}
            {isCustomized ? '*' : ''}
          </label>
        )}
        <Tooltip>{parameter.description || label}</Tooltip>
      </TooltipTrigger>
    </WidgetWrapper>
  );
};

type ParameterWidgetProps = {
  parameter: ParameterInterface;
  WidgetWrapper?: typeof WidgetWrapper;
};

const ParameterWidget = (props: ParameterWidgetProps) => {
  const { parameter } = props;
  const activeScenario = useReactiveVar(activeScenarioVar);
  const paths = usePaths();
  const [SetParameter, { loading: mutationLoading, error: mutationError }] = useMutation(
    SET_PARAMETER,
    {
      refetchQueries: 'active',
      context: {
        uri: '/api/graphql-paths',
        headers: getHttpHeaders({ instanceIdentifier: paths?.instance.id }),
      },
      onCompleted: () => {
        console.log('UPDATED', activeScenarioVar);
        activeScenarioVar({ ...activeScenario });
      },
    }
  );

  const handleUserSelection = (evt) => {
    SetParameter({ variables: evt });
  };

  switch (parameter.__typename) {
    case 'NumberParameterType':
      return (
        <NumberWidget
          id={parameter.id}
          initialValue={parameter.numberValue}
          defaultValue={parameter.numberDefaultValue}
          min={parameter.minValue}
          max={parameter.maxValue}
          handleChange={handleUserSelection}
          loading={mutationLoading}
          isCustomized={parameter.isCustomized}
          description={parameter.description}
          unit={parameter.unit}
          step={parameter.step}
        />
      );

    case 'StringParameterType':
      return <div>String</div>;

    case 'BoolParameterType':
      return (
        <BoolWidget
          parameter={parameter}
          handleChange={handleUserSelection}
          loading={mutationLoading}
          WidgetWrapper={props.WidgetWrapper ?? WidgetWrapper}
        />
      );

    case 'EnableParameterType':
      return (
        <BoolWidget
          parameter={parameter}
          handleChange={handleUserSelection}
          loading={mutationLoading}
          WidgetWrapper={props.WidgetWrapper ?? WidgetWrapper}
          hideLabel={true}
        />
      );

    default:
      return null;
  }
};

export default ParameterWidget;
