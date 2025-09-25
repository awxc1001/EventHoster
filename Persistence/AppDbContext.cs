using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options): DbContext(options)
{
    public DbSet<Activity> Activitiies { get; set; }
}
