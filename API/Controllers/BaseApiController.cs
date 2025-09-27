using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;


        //??= xx “如果左边是 null，就把右边赋值给左边”。
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
        ?? throw new InvalidOperationException("IMediator not found");
        //第二个？？如果 GetService<IMediator>() 返回 null，那就抛异常 "IMediator not found"。
    }
    //内置 Mediator

// private IMediator? _mediator; → 用来存 Mediator 实例。

// protected IMediator Mediator => ... → 一个属性，子类能直接用。

// 第一次调用时，从依赖注入容器里拿 Mediator 并存到 _mediator；

// 后面再调用就直接用缓存，不会重复找；

// 如果 DI 里没有 Mediator，就抛异常。
}