﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using Microsoft.Practices.Unity;
using FarmaDAL;
using FarmaModel;
using FarmaAPI.Resolver;
using System.Net.Http.Headers;
using System.Web.Http.Cors;

namespace FarmaAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            //Unity
            var container = new UnityContainer();
            container.RegisterType<IUnitOfWork, UnitOfWork>(new HierarchicalLifetimeManager());
            container.RegisterType<IGenericRepository<Farmacia>, GenericRepository<Farmacia>>(new HierarchicalLifetimeManager());
            config.DependencyResolver = new UnityResolver(container); 

            //Formatters
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            //GlobalConfiguration.Configuration.Formatters.XmlFormatter.SupportedMediaTypes.Clear();
            //config.Formatters.Insert(0, new System.Net.Http.Formatting.JsonMediaTypeFormatter());

            // Web API routes
            config.MapHttpAttributeRoutes();
            //config.EnableCors();
            var cors = new EnableCorsAttribute("http://localhost:28285", "*", "*");
            config.EnableCors(cors);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

        }
    }
}
