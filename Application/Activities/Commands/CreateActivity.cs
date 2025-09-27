using MediatR;
using Persistence;
using Domain;

namespace Application.Activities.Commands
{
    public class CreateActivity
    {   
// 在 MediatR 里有两个重要接口：
// // 不关心返回值
// public interface IRequest : IRequest<Unit> { }
// // 关心返回值
// public interface IRequest<out TResponse> { }
// 也就是说：
// IRequest → 表示这个命令没有返回值（或者说返回 Unit，相当于 void）。
// IRequest<T> → 表示这个命令有返回值，类型是 T。
        public class Command : IRequest<string>
        {
            public required Activity Activity { get; set; }
        }
        public class Handler(AppDbContext context) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Activities.Add(request.Activity);
                await context.SaveChangesAsync(cancellationToken);
                return request.Activity.Id;
            }
        }
    
    }
}