using JaTour.Core;
using JaTour.Interfaces;
using JaTour.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;

namespace JaTour.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors();
            
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddIdentityServices(config);

            return services;
        }
    }
}