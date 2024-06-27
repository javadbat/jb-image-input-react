import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';
import 'jb-image-input';
// eslint-disable-next-line no-duplicate-imports
import {JBImageInputWebComponent } from 'jb-image-input';
import {JBImageInputConfig, JBImageInputBridge } from 'jb-image-input/types';
export {JBImageInputConfig, JBImageInputBridge };

import { useEvent } from '../../../common/hooks/use-event';
// eslint-disable-next-line react/display-name


declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
      interface IntrinsicElements {
        'jb-image-input': JBImageInputType;
      }
      interface JBImageInputType extends React.DetailedHTMLProps<React.HTMLAttributes<JBImageInputWebComponent>, JBImageInputWebComponent> {
        class?:string,
        label?: string,
        name?:string,
        required?:string | boolean,
        // ref:React.RefObject<JBDateInputWebComponent>,
      }
    }
}
export const JBImageInput = React.forwardRef((props:JBImageInputProps, ref) => {
    const element = useRef<JBImageInputWebComponent>(null);
    const [refChangeCount, refChangeCountSetter] = useState(0);
    useImperativeHandle(
        ref,
        () => (element ? element.current : {}),
        [element],
    );
    useEffect(() => {
        refChangeCountSetter(refChangeCount + 1);
    }, [element.current]);
    useEffect(() => {
        if (props.config && element.current) {
            element.current.config = props.config;
        }
    }, [props.config]);

    useEffect(() => {
        if (props.bridge && element.current) {
            element.current.bridge = props.bridge;
        }
    }, [props.bridge]);

    useEffect(() => {
        if (props.multiple) {
            element.current?.setAttribute('multiple', 'true');
        } else {
            element.current?.removeAttribute('multiple');
        }
    }, [props.multiple]);
    useEffect(() => {
        if (props.value !== undefined && element.current) {
            element.current.value = props.value;
        }
    }, [props.value]);
    useEffect(() => {
        if (props.file) {
            element.current?.selectImageByFile(props.file);
        }
    }, [props.file]);
    useEffect(() => {
        if (props.acceptTypes && element.current) {
            element.current.acceptTypes = props.acceptTypes;
        }
    }, [props.acceptTypes]);
    useEffect(() => {
        if (props.maxFileSize !== undefined && element.current) {
            element.current.maxFileSize = props.maxFileSize;
        }
    }, [props.maxFileSize]);
    function onChange(e:JBImageInputEventType<Event>) {
        if (typeof props.onChange == "function") {
            props.onChange(e);
        }
    }
    function onImageSelected(e:JBImageInputEventType<CustomEvent>) {
        if (typeof props.onImageSelected == "function") {
            props.onImageSelected(e);
        }
    }
    function onMaxSizeExceed(e:JBImageInputEventType<CustomEvent>){
        if (typeof props.onMaxSizeExceed == "function") {
            props.onMaxSizeExceed(e);
        }
    }
    useEvent(element.current, 'change', onChange);
    useEvent(element.current, 'imageSelected', onImageSelected);
    useEvent(element.current, 'maxSizeExceed', onMaxSizeExceed);
    return (
        <jb-image-input ref={element} class={props.className || ''} placeholder-title={props.placeholderTitle} upload-type={props.uploadType || 'AUTO'} required={props.required}>
            {props.children}
        </jb-image-input>
    );
});
export type JBImageInputEventType<T> = T & {
    target: JBImageInputWebComponent
}
type JBImageInputProps = {
    className?: string,
    placeholderTitle?: string,
    required?: boolean,
    config?: JBImageInputConfig,
    value?: any,
    uploadType?: string,
    onChange?: (e:JBImageInputEventType<Event>)=>void,
    onImageSelected?: (e:JBImageInputEventType<CustomEvent>)=>void,
    bridge?: JBImageInputBridge,
    multiple?: boolean,
    file?: File,
    acceptTypes?: string,
    maxFileSize?: number,
    onMaxSizeExceed?: (e:JBImageInputEventType<Event>)=>void,
    children?:React.ReactNode
}
// JBImageInput.propTypes = {
//     className: PropTypes.string,
//     placeholderTitle: PropTypes.string,
//     required: PropTypes.bool,
//     config: PropTypes.object,
//     value: PropTypes.object,
//     uploadType: PropTypes.string,
//     onChange: PropTypes.func,
//     onImageSelected: PropTypes.func,
//     bridge: PropTypes.object,
//     multiple: PropTypes.bool,
//     file: PropTypes.object,
//     acceptTypes: PropTypes.string,
//     maxFileSize: PropTypes.number,
//     onMaxSizeExceed: PropTypes.func
// };
JBImageInput.displayName = "JBImageInput";

