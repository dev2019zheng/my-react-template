import React from 'react';
interface HocProps {
  name: string
}

const foo = (Comp: React.ComponentType<HocProps>) => (props: HocProps) => {
  return (
    <div className="border-red">
      <Comp {...props} />
    </div>
  )
}

function FunctionChild(props: HocProps) {
  return <div>FunctionChild-{props.name}</div>
}


const foo2 = (Comp: React.ComponentType<HocProps>) => {
  return class NewComp extends React.Component<HocProps> {
    render() {
      return (<div className="border-red">
        <Comp {...this.props} />
      </div>)
    }
  }
}

@foo2
@foo2
@foo2
@foo2
@foo2
class ClassChild extends React.Component<HocProps> {
  render() {
    return <div>ClassChild-{this.props.name}</div>
  }
}


const Foo = foo(foo(FunctionChild));

function HocPage() {
  return (
    <div className="pd10">
      <h3>Hoc Page</h3>
      <Foo name="参数" />
      <div className="h10"></div>
      <ClassChild name="新参数" />
    </div>
  );
}

export default HocPage;